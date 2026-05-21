import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Alert,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Layout,
  Row,
  Space,
  Tabs,
  Typography,
  message
} from 'antd'
import DynamicForm from './components/DynamicForm.jsx'
import DynamicDetail from './components/DynamicDetail.jsx'
import SchemaViewer from './components/SchemaViewer.jsx'
import { formSchema, initialRecord } from './schema/sampleSchema.js'
import './styles.css'

const { Header, Content } = Layout
const { Paragraph, Text, Title } = Typography

function App() {
  const [record, setRecord] = useState(initialRecord)

  const schemaText = useMemo(() => JSON.stringify(formSchema, null, 2), [])
  const recordText = useMemo(() => JSON.stringify(record, null, 2), [record])

  const handleSubmit = (values) => {
    setRecord(values)
    message.success('Form payload updated')
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
          colorPrimary: '#1677ff',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }
      }}
    >
      <Layout className="app-shell">
        <Header className="app-header">
          <div>
            <Title level={3}>Low-Code Form Runtime Demo</Title>
            <Paragraph>
              JSON schema driven form and detail renderer for CRM-style internal tools.
            </Paragraph>
          </div>
        </Header>
        <Content className="app-content">
          <Alert
            type="info"
            showIcon
            message="Portfolio-safe runtime"
            description="This demo is rebuilt as a clean public sample. It only uses basic Ant Design components and avoids moduleAlias references, query scheme configuration, formula designers, remote CRM APIs, and company styling."
          />

          <Row gutter={[16, 16]} className="summary-row">
            <Col xs={24} md={8}>
              <Card title="Schema Input">
                <Text>Pass a JSON config to describe cards, fields, validation, and sub-tables.</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Form Runtime">
                <Text>Render editable fields and emit a normalized payload on submit.</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Detail Runtime">
                <Text>Reuse the same schema to render read-only record detail pages.</Text>
              </Card>
            </Col>
          </Row>

          <Tabs
            className="runtime-tabs"
            items={[
              {
                key: 'form',
                label: 'Form Runtime',
                children: (
                  <DynamicForm
                    schema={formSchema}
                    value={record}
                    onSubmit={handleSubmit}
                  />
                )
              },
              {
                key: 'detail',
                label: 'Detail Renderer',
                children: <DynamicDetail schema={formSchema} value={record} />
              },
              {
                key: 'schema',
                label: 'Schema Preview',
                children: (
                  <SchemaViewer
                    schemaText={schemaText}
                    recordText={recordText}
                  />
                )
              }
            ]}
          />

          <Divider />
          <Space wrap>
            <Button
              onClick={() => {
                setRecord(initialRecord)
                message.info('Record reset')
              }}
            >
              Reset demo data
            </Button>
            <Text type="secondary">
              Supported now: text, textarea, number, amount, percentage, select, multiple select, checkbox, switch, radio, date, date range, and editable sub-table.
            </Text>
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
