import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stats } from '../data/stats'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import { RevenueChart, SalesPieChart, PerformanceAreaChart } from '../components/Charts'
import ActivityFeed from '../components/ActivityFeed'
import { PageHeader } from '../components/FadeIn'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function DashboardView({ onNavigate, userName = 'there' }) {
  const firstName = userName.split(' ')[0]
  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName} 👋`}
        description="Here’s what’s happening across your workspace today."
        action={
          <button onClick={() => onNavigate('analytics')} className="btn-primary">
            View analytics
            <ArrowRight className="h-4 w-4" />
          </button>
        }
      />

      {/* Stat cards with stagger */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={item}>
            <StatCard stat={stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue vs. target"
          className="lg:col-span-2"
          delay={0.05}
        >
          <RevenueChart />
        </ChartCard>
        <ChartCard title="Sales Distribution" subtitle="Revenue by plan" delay={0.1}>
          <SalesPieChart />
        </ChartCard>
      </div>

      {/* Performance + Activity */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard
          title="Weekly Performance"
          subtitle="Sessions and conversions"
          className="lg:col-span-2"
          delay={0.05}
        >
          <PerformanceAreaChart />
        </ChartCard>
        <ChartCard title="Recent Activity" subtitle="Latest workspace events" delay={0.1}>
          <ActivityFeed />
        </ChartCard>
      </div>
    </div>
  )
}
