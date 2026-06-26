import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { cn } from '../lib/utils'
import AnimatedCounter from './AnimatedCounter'

const iconMap = { DollarSign, Users, Target, TrendingUp }

const accentStyles = {
  emerald: { icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300', stroke: '#10b981' },
  indigo: { icon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300', stroke: '#6366f1' },
  amber: { icon: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300', stroke: '#f59e0b' },
  violet: { icon: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300', stroke: '#8b5cf6' },
}

export default function StatCard({ stat }) {
  const Icon = iconMap[stat.icon] ?? DollarSign
  const accent = accentStyles[stat.accent] ?? accentStyles.indigo
  const up = stat.trend === 'up'
  const chartData = stat.spark.map((v, i) => ({ i, v }))

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card group relative overflow-hidden p-5 hover:shadow-lift"
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className={cn('grid h-11 w-11 place-items-center rounded-xl', accent.icon)}>
          <Icon className="h-5.5 w-5.5" />
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold',
            up
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
          )}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(stat.change)}%
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <p className="text-sm font-medium text-ink-500 dark:text-ink-400">{stat.label}</p>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink-900 dark:text-white">
          <AnimatedCounter
            value={stat.value}
            prefix={stat.prefix ?? ''}
            suffix={stat.suffix ?? ''}
            decimals={stat.decimals ?? 0}
          />
        </p>
      </div>

      <div className="relative z-10 mt-3 flex items-center gap-1.5 text-xs text-ink-400">
        {up ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
        )}
        <span>{stat.description}</span>
      </div>

      {/* Sparkline */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-14 opacity-60 transition-opacity group-hover:opacity-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`spark-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent.stroke} stopOpacity={0.28} />
                <stop offset="100%" stopColor={accent.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={accent.stroke}
              strokeWidth={2}
              fill={`url(#spark-${stat.id})`}
              isAnimationActive
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
