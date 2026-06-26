import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { formatNumber } from '../lib/utils'
import { revenueData, userGrowthData, salesDistribution, performanceData } from '../data/charts'

function useAxisColors() {
  const { isDark } = useTheme()
  return {
    grid: isDark ? '#1e293b' : '#eef2f6',
    axis: isDark ? '#64748b' : '#94a3b8',
  }
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-ink-200/80 bg-white/95 px-3 py-2 shadow-lift backdrop-blur dark:border-ink-700 dark:bg-ink-900/95">
      <p className="mb-1 text-xs font-semibold text-ink-800 dark:text-ink-100">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey ?? entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color ?? entry.payload?.color }}
          />
          <span className="capitalize text-ink-500 dark:text-ink-400">{entry.name}</span>
          <span className="ml-auto font-semibold text-ink-800 dark:text-ink-100">
            {formatter ? formatter(entry.value) : formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

const axisTick = (axis) => ({ fontSize: 12, fill: axis })

/* ---------- Revenue Line Chart ---------- */
export function RevenueChart() {
  const { grid, axis } = useAxisColors()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={revenueData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick(axis)} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={axisTick(axis)}
          tickFormatter={(v) => `$${formatNumber(v, { compact: true })}`}
        />
        <Tooltip
          content={<CustomTooltip formatter={(v) => `$${formatNumber(v)}`} />}
          cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Line
          type="monotone"
          dataKey="target"
          name="Target"
          stroke={axis}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          animationDuration={1200}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
          animationDuration={1400}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

/* ---------- User Growth Bar Chart ---------- */
export function UserGrowthChart() {
  const { grid, axis } = useAxisColors()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={userGrowthData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barGap={6}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick(axis)} />
        <YAxis tickLine={false} axisLine={false} tick={axisTick(axis)} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
        <Bar dataKey="newUsers" name="New users" fill="#6366f1" radius={[6, 6, 0, 0]} animationDuration={1200} />
        <Bar dataKey="churned" name="Churned" fill="#c7d2fe" radius={[6, 6, 0, 0]} animationDuration={1200} />
      </BarChart>
    </ResponsiveContainer>
  )
}

/* ---------- Sales Distribution Pie Chart ---------- */
export function SalesPieChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
          <Pie
            data={salesDistribution}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={3}
            stroke="none"
            animationDuration={1100}
          >
            {salesDistribution.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="grid w-full grid-cols-2 gap-3 sm:max-w-[160px] sm:grid-cols-1">
        {salesDistribution.map((s) => (
          <li key={s.name} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-ink-600 dark:text-ink-300">{s.name}</span>
            <span className="ml-auto font-semibold text-ink-800 dark:text-ink-100">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Monthly Performance Area Chart ---------- */
export function PerformanceAreaChart() {
  const { grid, axis } = useAxisColors()
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={performanceData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="sessionsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="convFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={axisTick(axis)} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={axisTick(axis)}
          tickFormatter={(v) => formatNumber(v, { compact: true })}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span className="capitalize text-ink-500">{value}</span>}
        />
        <Area
          type="monotone"
          dataKey="sessions"
          name="Sessions"
          stroke="#6366f1"
          strokeWidth={2.5}
          fill="url(#sessionsFill)"
          animationDuration={1300}
        />
        <Area
          type="monotone"
          dataKey="conversions"
          name="Conversions"
          stroke="#06b6d4"
          strokeWidth={2.5}
          fill="url(#convFill)"
          animationDuration={1300}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
