import { stats } from '../data/stats'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import {
  RevenueChart,
  UserGrowthChart,
  SalesPieChart,
  PerformanceAreaChart,
} from '../components/Charts'
import { PageHeader } from '../components/FadeIn'

export default function AnalyticsView() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Deep-dive into revenue, growth, and engagement metrics."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Revenue Line Chart" subtitle="Revenue vs. target by month">
          <RevenueChart />
        </ChartCard>
        <ChartCard title="User Growth" subtitle="New vs. churned users" delay={0.05}>
          <UserGrowthChart />
        </ChartCard>
        <ChartCard title="Monthly Performance" subtitle="Sessions & conversions" delay={0.05}>
          <PerformanceAreaChart />
        </ChartCard>
        <ChartCard title="Sales Distribution" subtitle="Share of revenue by plan" delay={0.1}>
          <SalesPieChart />
        </ChartCard>
      </div>
    </div>
  )
}
