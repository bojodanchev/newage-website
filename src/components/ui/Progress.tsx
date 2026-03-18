import { cn } from '@/lib/utils'

interface ProgressProps {
  steps: number
  currentStep: number
  labels?: string[]
  className?: string
}

export function Progress({
  steps,
  currentStep,
  labels,
  className,
}: ProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center">
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div
              className={cn(
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                'text-sm font-medium transition-all duration-300',
                i < currentStep &&
                  'bg-gradient-to-r from-accent-purple to-accent-mint text-white',
                i === currentStep &&
                  'border-2 border-accent-purple text-accent-purple bg-neutral-900',
                i > currentStep &&
                  'border border-neutral-700 text-neutral-500 bg-neutral-900'
              )}
            >
              {i < currentStep ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {/* Line */}
            {i < steps - 1 && (
              <div className="flex-1 h-px mx-2">
                <div
                  className={cn(
                    'h-full transition-colors duration-300',
                    i < currentStep
                      ? 'bg-gradient-to-r from-accent-purple to-accent-mint'
                      : 'bg-neutral-700'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {labels && (
        <div className="flex mt-2">
          {labels.map((label, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 text-xs text-center last:flex-none',
                i <= currentStep ? 'text-foreground' : 'text-neutral-500'
              )}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
