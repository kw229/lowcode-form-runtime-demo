import React from 'react'
import { Card, Col, Row, Typography } from 'antd'

const { Text } = Typography

export default function SchemaViewer({ schemaText, recordText }) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={14}>
        <Card title="Form schema">
          <pre className="code-panel">{schemaText}</pre>
        </Card>
      </Col>
      <Col xs={24} lg={10}>
        <Card title="Current payload">
          <pre className="code-panel">{recordText}</pre>
        </Card>
      </Col>
      <Col span={24}>
        <Text type="secondary">
          Complex production-only capabilities such as moduleAlias references, query scheme configuration, formula designers, and remote data authorization are intentionally excluded from this public demo.
        </Text>
      </Col>
    </Row>
  )
}
