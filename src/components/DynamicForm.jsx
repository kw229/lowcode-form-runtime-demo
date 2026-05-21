import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react'
import { Button, Card, Col, Form, Row, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { fieldRules, renderFormField } from './fieldRuntime.jsx'

function createPrimaryKey(prefix = 'row') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function createEmptyTableRow(section) {
  if (!section.rowKey) {
    return {}
  }
  return {
    [section.rowKey]: createPrimaryKey(section.name)
  }
}

function ensureTableRowKey(row, section) {
  if (!section.rowKey || row[section.rowKey]) {
    return row
  }
  return {
    ...row,
    [section.rowKey]: createPrimaryKey(section.name)
  }
}

function prepareInitialValues(value, schema) {
  const nextValues = { ...value }
  schema.sections.forEach((section) => {
    if (section.type === 'card') {
      section.fields.forEach((field) => {
        const fieldValue = nextValues[field.name]
        if (field.type === 'date' && fieldValue) {
          nextValues[field.name] = dayjs(fieldValue)
        }
        if (field.type === 'dateRange' && Array.isArray(fieldValue)) {
          nextValues[field.name] = fieldValue.map((item) => item ? dayjs(item) : item)
        }
      })
    }
    if (section.type === 'table') {
      nextValues[section.name] = (nextValues[section.name] || []).map((row) => {
        const nextRow = ensureTableRowKey({ ...row }, section)
        section.columns.forEach((field) => {
          if (field.type === 'date' && nextRow[field.name]) {
            nextRow[field.name] = dayjs(nextRow[field.name])
          }
        })
        return nextRow
      })
    }
  })
  return nextValues
}

function normalizeValues(values, schema) {
  const nextValues = { ...values }
  schema.sections.forEach((section) => {
    if (section.type === 'card') {
      section.fields.forEach((field) => {
        const value = nextValues[field.name]
        if (field.type === 'date' && value?.format) {
          nextValues[field.name] = value.format('YYYY-MM-DD')
        }
        if (field.type === 'dateRange' && Array.isArray(value)) {
          nextValues[field.name] = value.map((item) =>
            item?.format ? item.format('YYYY-MM-DD') : item
          )
        }
      })
    }
    if (section.type === 'table') {
      nextValues[section.name] = (nextValues[section.name] || []).map((row) => {
        const nextRow = ensureTableRowKey({ ...row }, section)
        section.columns.forEach((field) => {
          const value = nextRow[field.name]
          if (field.type === 'date' && value?.format) {
            nextRow[field.name] = value.format('YYYY-MM-DD')
          }
        })
        return nextRow
      })
    }
  })
  return nextValues
}

const CardSection = memo(function CardSection({ section }) {
  const columns = section.columns || 2

  return (
    <Card title={section.title} className="runtime-card">
      <Row gutter={16}>
        {section.fields.map((field) => (
          <Col
            key={field.name}
            xs={24}
            md={(24 / columns) * (field.span || 1)}
          >
            <Form.Item
              name={field.name}
              label={field.label}
              rules={fieldRules(field)}
              valuePropName={
                field.type === 'switch' || field.type === 'checkbox'
                  ? 'checked'
                  : 'value'
              }
            >
              {renderFormField(field)}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Card>
  )
})

const TableSection = memo(function TableSection({ section }) {
  const columns = useMemo(
    () =>
      section.columns.map((field) => ({
        title: field.label,
        dataIndex: field.name,
        key: field.name,
        width: field.width || 180,
        render: (_, row, rowIndex) => (
          <Form.Item
            name={[section.name, rowIndex, field.name]}
            rules={fieldRules(field)}
            valuePropName={
              field.type === 'switch' || field.type === 'checkbox'
                ? 'checked'
                : 'value'
            }
            className="table-form-item"
          >
            {renderFormField(field)}
          </Form.Item>
        )
      })),
    [section]
  )

  return (
    <Card title={section.title} className="runtime-card">
      <Form.List name={section.name}>
        {(rows, { add, remove }) => (
          <>
            <Table
              rowKey="key"
              pagination={false}
              columns={[
                ...columns,
                {
                  title: 'Actions',
                  key: 'actions',
                  width: 120,
                  render: (_, row) => (
                    <Button danger type="link" onClick={() => remove(row.name)}>
                      Remove
                    </Button>
                  )
                }
              ]}
              dataSource={rows}
              scroll={{ x: 'max-content' }}
            />
            <Button
              className="table-add-button"
              onClick={() => add(createEmptyTableRow(section))}
            >
              Add row
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  )
})

function DynamicForm({ schema, value, onSubmit }, ref) {
  const [form] = Form.useForm()
  const initialValues = useMemo(() => prepareInitialValues(value, schema), [schema, value])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  const getNormalizedValues = useCallback(
    () => normalizeValues(form.getFieldsValue(true), schema),
    [form, schema]
  )

  useImperativeHandle(
    ref,
    () => ({
      submit: () => form.submit(),
      reset: () => form.resetFields(),
      getValues: getNormalizedValues,
      setValues: (nextValues) => form.setFieldsValue(prepareInitialValues(nextValues, schema)),
      validate: () => form.validateFields()
    }),
    [form, getNormalizedValues, schema]
  )

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={(values) => onSubmit(normalizeValues(values, schema))}
    >
      {schema.sections.map((section) => {
        if (section.type === 'table') {
          return <TableSection key={section.name} section={section} />
        }
        return <CardSection key={section.title} section={section} />
      })}
      <Space className="form-actions">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
      </Space>
    </Form>
  )
}

export default forwardRef(DynamicForm)
