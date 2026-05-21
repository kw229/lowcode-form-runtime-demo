# Low-Code Form Runtime Demo

A public-safe React demo for rendering CRM-style forms and detail pages from a JSON schema.

This project was rebuilt as a clean portfolio sample. It uses basic Ant Design components only and does not include company UI styles, production API endpoints, proprietary business data, query scheme configuration, formula designers, or module-specific runtime dependencies.

## Screenshots

![Form runtime](./screenshots/form-runtime.png)

![Detail renderer](./screenshots/detail-renderer.png)

## Features

- JSON schema driven cards, fields, validation, and editable sub-tables
- Editable form runtime with normalized submit payload
- Read-only detail renderer using the same schema
- Live schema and payload preview
- Basic field support: text, textarea, number, amount, percentage, select, multiple select, checkbox, switch, radio, date, date range, and table rows
- Portfolio-friendly CRM sample data in English

## Tech Stack

- React 18
- Vite
- Ant Design 5

## Getting Started

```bash
yarn install
yarn dev
```

Build for production:

```bash
yarn build
```

## Example Usage

```jsx
import { useState } from 'react'
import DynamicForm from './components/DynamicForm.jsx'
import DynamicDetail from './components/DynamicDetail.jsx'
import { formSchema, initialRecord } from './schema/sampleSchema.js'

function Demo() {
  const [record, setRecord] = useState(initialRecord)

  return (
    <>
      <DynamicForm schema={formSchema} value={record} onSubmit={setRecord} />
      <DynamicDetail schema={formSchema} value={record} />
    </>
  )
}
```

## Schema Shape

The schema is intentionally small and easy to read:

```js
{
  title: 'Opportunity Form',
  sections: [
    {
      type: 'card',
      title: 'Basic Information',
      columns: 2,
      fields: [
        { name: 'customerName', label: 'Customer Name', type: 'text', required: true }
      ]
    },
    {
      type: 'table',
      name: 'milestones',
      title: 'Implementation Milestones',
      columns: [
        { name: 'name', label: 'Milestone', type: 'text', required: true }
      ]
    }
  ]
}
```

## Public Demo Scope

This demo focuses on simple reusable runtime behavior. Complex production features are intentionally excluded so the repository stays clean, understandable, and safe to publish.
