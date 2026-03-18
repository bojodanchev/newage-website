import { cn } from '@/lib/utils'

const stepLabels = ['Service', 'Business', 'Project', 'Contact']

interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300',
                    isCompleted &&
                      'bg-accent-purple text-white',
                    isCurrent &&
                      'border-2 border-accent-purple bg-transparent text-accent-purple animate-pulse',
                    !isCompleted &&
                      !isCurrent &&
                      'bg-neutral-700 text-neutral-500'
                  )}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors',
                    isCurrent ? 'text-accent-purple' : 'text-neutral-500'
                  )}
                >
                  {stepLabels[i]}
                </span>
              </div>

              {step < totalSteps && (
                <div
                  className={cn(
                    'mx-2 h-px flex-1 transition-colors duration-300',
                    isCompleted ? 'bg-accent-purple' : 'bg-neutral-700'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
