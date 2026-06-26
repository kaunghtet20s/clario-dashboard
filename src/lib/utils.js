// Tiny className combiner (no extra deps)
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const formatCurrency = (value, { compact = false } = {}) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)

export const formatNumber = (value, { compact = false } = {}) =>
  new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value)

// Deterministic avatar gradient from a string seed
export function avatarGradient(seed = '') {
  const palettes = [
    ['#6366f1', '#a855f7'],
    ['#06b6d4', '#3b82f6'],
    ['#f59e0b', '#ef4444'],
    ['#10b981', '#06b6d4'],
    ['#ec4899', '#f43f5e'],
    ['#8b5cf6', '#6366f1'],
    ['#14b8a6', '#22c55e'],
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const [a, b] = palettes[hash % palettes.length]
  return `linear-gradient(135deg, ${a}, ${b})`
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}
