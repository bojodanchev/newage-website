import type { Metric } from '@/types/content'

export const metrics: Metric[] = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 340, suffix: '%', label: 'Avg Revenue Increase' },
  { value: 500, suffix: '+', label: 'Automations Built' },
  { value: 10000, suffix: '+', label: 'Hours Saved Monthly', prefix: '' },
]

export function getAllMetrics(): Metric[] {
  return metrics
}
