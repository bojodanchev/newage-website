'use client'

import { cn } from '@/lib/utils'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const serviceOptions = [
  { value: 'software-development', label: 'Software Development', icon: '💻' },
  { value: 'automation-systems', label: 'Automation & Systems', icon: '⚙️' },
  { value: 'marketing-growth', label: 'Marketing & Growth', icon: '📈' },
  { value: 'sales-infrastructure', label: 'Sales Infrastructure', icon: '💰' },
  { value: 'full-business-build', label: 'Full Business Build', icon: '🏢' },
  { value: 'not-sure', label: 'Not Sure Yet', icon: '🤔' },
]

interface Step1ServiceProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
  selectedValue?: string
}

export function Step1Service({ register, errors, selectedValue }: Step1ServiceProps) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        What do you need?
      </h2>
      <p className="mb-8 text-neutral-400">
        Select the service that best matches your project.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOptions.map((option) => (
          <label
            key={option.value}
            className={cn(
              'group relative cursor-pointer rounded-xl bg-white/5 backdrop-blur-xl border p-5',
              'transition-all duration-200',
              selectedValue === option.value
                ? 'border-accent-purple bg-accent-purple/10'
                : 'border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
            )}
          >
            <input
              type="radio"
              value={option.value}
              {...register('serviceCategory')}
              className="sr-only"
            />
            <span className="mb-3 block text-2xl">{option.icon}</span>
            <span className="block font-medium text-foreground">
              {option.label}
            </span>
            {selectedValue === option.value && (
              <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent-purple">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>

      {errors.serviceCategory && (
        <p className="mt-4 text-sm text-red-500">
          {errors.serviceCategory.message}
        </p>
      )}
    </div>
  )
}
