import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import CustomerSection from '../components/CustomerSection'
import AddCustomerModal from '../components/AddCustomerModal'
import FadeIn, { PageHeader } from '../components/FadeIn'
import { customers as seedCustomers } from '../data/customers'

export default function CustomersView({ onToast }) {
  const [customers, setCustomers] = useState(seedCustomers)
  const [addOpen, setAddOpen] = useState(false)

  const handleCreate = (customer) => {
    setCustomers((prev) => [customer, ...prev])
    onToast({ title: 'Customer added', description: `${customer.name} · ${customer.plan}`, tone: 'success' })
  }

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage accounts, plans, and lifecycle stages."
        action={
          <button onClick={() => setAddOpen(true)} className="btn-primary">
            <UserPlus className="h-4 w-4" />
            Add customer
          </button>
        }
      />
      <FadeIn>
        <CustomerSection
          customers={customers}
          onAction={(c) => onToast({ title: `Manage ${c.name}`, description: c.company, tone: 'info' })}
        />
      </FadeIn>

      <AddCustomerModal open={addOpen} onClose={() => setAddOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
