import type { Metric } from '@/types/content'

export const metrics: Metric[] = [
  { value: 150, suffix: '+', label: 'Реализирани проекта' },
  { value: 340, suffix: '%', label: 'Средно увеличение на приходите' },
  { value: 500, suffix: '+', label: 'Изградени автоматизации' },
  { value: 10000, suffix: '+', label: 'Спестени часове месечно', prefix: '' },
]

export function getAllMetrics(): Metric[] {
  return metrics
}
