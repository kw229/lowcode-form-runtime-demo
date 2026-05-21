import React from 'react'
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch
} from 'antd'

const { RangePicker } = DatePicker

export function fieldRules(field) {
  const rules = []
  if (field.required) {
    rules.push({ required: true, message: `${field.label} is required` })
  }
  return rules
}

export function optionLabel(field, value) {
  const option = field.options?.find((item) => item.value === value)
  return option?.label ?? value
}

export function renderFormField(field) {
  const common = {
    placeholder: field.placeholder || `Enter ${field.label?.toLowerCase() || 'value'}`
  }

  switch (field.type) {
    case 'textarea':
      return <Input.TextArea rows={field.rows || 3} {...common} />
    case 'number':
      return <InputNumber min={field.min} max={field.max} style={{ width: '100%' }} />
    case 'amount':
      return (
        <InputNumber
          min={field.min}
          max={field.max}
          precision={2}
          prefix="$"
          style={{ width: '100%' }}
        />
      )
    case 'percentage':
      return (
        <InputNumber
          min={field.min}
          max={field.max}
          precision={0}
          formatter={(value) => (value === undefined || value === null ? '' : `${value}%`)}
          parser={(value) => value?.replace('%', '') || ''}
          style={{ width: '100%' }}
        />
      )
    case 'select':
      return <Select options={field.options || []} allowClear {...common} />
    case 'multipleSelect':
      return <Select mode="multiple" options={field.options || []} allowClear {...common} />
    case 'checkbox':
      return <Checkbox>{field.checkboxLabel || field.label}</Checkbox>
    case 'switch':
      return <Switch />
    case 'radio':
      return <Radio.Group options={field.options || []} />
    case 'date':
      return <DatePicker style={{ width: '100%' }} />
    case 'dateRange':
      return <RangePicker style={{ width: '100%' }} />
    default:
      return <Input {...common} />
  }
}

export function renderDisplayValue(field, value) {
  if (value === undefined || value === null || value === '') {
    return '-'
  }

  switch (field.type) {
    case 'amount':
      return `$${Number(value || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    case 'percentage':
      return `${value}%`
    case 'select':
    case 'radio':
      return optionLabel(field, value)
    case 'multipleSelect':
      return Array.isArray(value)
        ? value.map((item) => optionLabel(field, item)).join(', ')
        : optionLabel(field, value)
    case 'checkbox':
    case 'switch':
      return value ? 'Yes' : 'No'
    case 'dateRange':
      return Array.isArray(value) ? value.join(' to ') : String(value)
    default:
      return String(value)
  }
}
