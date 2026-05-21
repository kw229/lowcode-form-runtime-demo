import React from 'react'
import { Card, Col, Descriptions, Row, Table, Typography } from 'antd'
import { renderDisplayValue } from './fieldRuntime.jsx'

const { Text } = Typography

function CardDetail({ section, value }) {
  return (
    <Card title={section.title} className="runtime-card">
      <Descriptions bordered column={section.columns || 2} size="small">
        {section.fields.map((field) => (
          <Descriptions.Item key={field.name} label={field.label}>
            {renderDisplayValue(field, value[field.name])}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  )
}

function TableDetail({ section, value }) {
  const rows = value[section.name] || []
  const columns = section.columns.map((field) => ({
    title: field.label,
    dataIndex: field.name,
    key: field.name,
    render: (cellValue) => renderDisplayValue(field, cellValue)
  }))

  return (
    <Card title={section.title} className="runtime-card">
      <Table
        rowKey={section.rowKey || 'id'}
        pagination={false}
        columns={columns}
        dataSource={rows}
      />
    </Card>
  )
}

export default function DynamicDetail({ schema, value }) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Text type="secondary">
          The detail renderer reuses the same JSON schema and switches field controls to read-only display values.
        </Text>
      </Col>
      <Col span={24}>
        {schema.sections.map((section) =>
          section.type === 'table' ? (
            <TableDetail key={section.name} section={section} value={value} />
          ) : (
            <CardDetail key={section.title} section={section} value={value} />
          )
        )}
      </Col>
    </Row>
  )
}
