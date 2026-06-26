// Pricing / billing plans
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams getting started with analytics.',
    monthly: 29,
    yearly: 290,
    features: [
      'Up to 5 team members',
      '10k tracked events / mo',
      'Basic dashboards',
      'Email support',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing companies that need deeper insight.',
    monthly: 79,
    yearly: 790,
    features: [
      'Up to 25 team members',
      '250k tracked events / mo',
      'Advanced charts & funnels',
      'Priority support',
      'Custom reports',
    ],
    highlighted: true,
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with advanced security needs.',
    monthly: 199,
    yearly: 1990,
    features: [
      'Unlimited team members',
      'Unlimited events',
      'SSO & SCIM provisioning',
      'Dedicated success manager',
      'SLA & audit logs',
    ],
    highlighted: false,
  },
]

export const invoices = [
  { id: 'INV-2026-006', date: 'Jun 1, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-005', date: 'May 1, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: 29, status: 'Paid' },
]
