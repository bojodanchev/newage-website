import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3',
            'text-foreground placeholder:text-neutral-500',
            'transition-colors duration-200 min-h-[120px] resize-y',
            'focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 focus:outline-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
