// Messages view seed data
export const conversations = [
  {
    id: 'm1',
    name: 'Lena Brooks',
    company: 'Bloom & Co',
    preview: 'Can we review the marketing site before Friday?',
    time: '2m',
    unread: 2,
    online: true,
  },
  {
    id: 'm2',
    name: 'Marcus Hill',
    company: 'Vertex Finance',
    preview: 'The analytics export looks great, thanks!',
    time: '24m',
    unread: 0,
    online: true,
  },
  {
    id: 'm3',
    name: 'Diego Santos',
    company: 'Pulse Health',
    preview: 'When is the next onboarding session?',
    time: '1h',
    unread: 1,
    online: false,
  },
  {
    id: 'm4',
    name: 'Oliver Reed',
    company: 'Quantum Grid',
    preview: 'Sent over the signed renewal contract.',
    time: '3h',
    unread: 0,
    online: false,
  },
  {
    id: 'm5',
    name: 'Hana Kim',
    company: 'Drift Studio',
    preview: 'Just started the trial — loving it so far.',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
]

export const thread = [
  { id: 1, from: 'them', text: 'Hi! Quick question about the new dashboard.', time: '09:41' },
  { id: 2, from: 'me', text: 'Of course — happy to help. What’s up?', time: '09:42' },
  {
    id: 3,
    from: 'them',
    text: 'Can we review the marketing site before Friday?',
    time: '09:44',
  },
  {
    id: 4,
    from: 'me',
    text: 'Absolutely. I’ll share a staging link this afternoon.',
    time: '09:45',
  },
]
