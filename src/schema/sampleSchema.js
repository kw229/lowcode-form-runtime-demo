export const formSchema = {
  title: 'Sales Opportunity',
  description: 'A compact CRM opportunity form described by JSON.',
  sections: [
    {
      type: 'card',
      title: 'Basic Information',
      columns: 2,
      fields: [
        {
          type: 'text',
          label: 'Opportunity name',
          name: 'name',
          required: true,
          placeholder: 'Enterprise CRM rollout'
        },
        {
          type: 'select',
          label: 'Stage',
          name: 'stage',
          required: true,
          options: [
            { label: 'Discovery', value: 'discovery' },
            { label: 'Proposal', value: 'proposal' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Closed won', value: 'closed_won' }
          ]
        },
        {
          type: 'amount',
          label: 'Estimated value',
          name: 'amount',
          required: true,
          min: 0
        },
        {
          type: 'percentage',
          label: 'Win probability',
          name: 'probability',
          min: 0,
          max: 100
        },
        {
          type: 'dateRange',
          label: 'Expected delivery window',
          name: 'deliveryWindow'
        },
        {
          type: 'multipleSelect',
          label: 'Tags',
          name: 'tags',
          options: [
            { label: 'CRM', value: 'crm' },
            { label: 'Automation', value: 'automation' },
            { label: 'Reporting', value: 'reporting' },
            { label: 'Integration', value: 'integration' }
          ]
        },
        {
          type: 'textarea',
          label: 'Customer requirements',
          name: 'requirements',
          span: 2,
          rows: 4
        }
      ]
    },
    {
      type: 'card',
      title: 'Commercial Settings',
      columns: 3,
      fields: [
        {
          type: 'radio',
          label: 'Contract type',
          name: 'contractType',
          options: [
            { label: 'Fixed price', value: 'fixed' },
            { label: 'Time and materials', value: 'time_materials' }
          ]
        },
        {
          type: 'switch',
          label: 'Requires approval',
          name: 'requiresApproval'
        },
        {
          type: 'checkbox',
          label: 'Include implementation support',
          name: 'implementationSupport'
        }
      ]
    },
    {
      type: 'table',
      title: 'Implementation Milestones',
      name: 'milestones',
      rowKey: 'id',
      columns: [
        {
          type: 'text',
          label: 'Milestone',
          name: 'title',
          required: true
        },
        {
          type: 'select',
          label: 'Owner',
          name: 'owner',
          options: [
            { label: 'Solution consultant', value: 'solution_consultant' },
            { label: 'Frontend engineer', value: 'frontend_engineer' },
            { label: 'Backend engineer', value: 'backend_engineer' }
          ]
        },
        {
          type: 'date',
          label: 'Due date',
          name: 'dueDate'
        },
        {
          type: 'number',
          label: 'Estimated days',
          name: 'days',
          min: 0
        }
      ]
    }
  ]
}

export const initialRecord = {
  name: 'Enterprise CRM rollout',
  stage: 'proposal',
  amount: 86000,
  probability: 65,
  deliveryWindow: ['2026-06-01', '2026-08-31'],
  tags: ['crm', 'integration'],
  requirements:
    'The customer needs a configurable opportunity workflow, approval steps, dashboards, and ERP integration points.',
  contractType: 'fixed',
  requiresApproval: true,
  implementationSupport: true,
  milestones: [
    {
      id: 'm1',
      title: 'Requirement workshop',
      owner: 'solution_consultant',
      dueDate: '2026-06-05',
      days: 3
    },
    {
      id: 'm2',
      title: 'Runtime form configuration',
      owner: 'frontend_engineer',
      dueDate: '2026-06-21',
      days: 8
    },
    {
      id: 'm3',
      title: 'API integration',
      owner: 'backend_engineer',
      dueDate: '2026-07-12',
      days: 10
    }
  ]
}
