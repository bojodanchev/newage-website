import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6+-months', label: '6+ months' },
  { value: 'not-sure', label: 'Not sure' },
]

const budgets = [
  { value: '5k-10k', label: '$5K - $10K' },
  { value: '10k-25k', label: '$10K - $25K' },
  { value: '25k-50k', label: '$25K - $50K' },
  { value: '50k-100k', label: '$50K - $100K' },
  { value: '100k+', label: '$100K+' },
]

interface Step3ProjectProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

export function Step3Project({ register, errors }: Step3ProjectProps) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        Project details
      </h2>
      <p className="mb-8 text-neutral-400">
        Help us understand the scope and timeline.
      </p>

      <div className="space-y-6">
        <Select
          label="Timeline"
          placeholder="When do you need this?"
          options={timelines}
          error={errors.timeline?.message}
          {...register('timeline')}
        />

        <Select
          label="Budget Range"
          placeholder="Select a budget range"
          options={budgets}
          error={errors.budgetRange?.message}
          {...register('budgetRange')}
        />

        <Textarea
          label="Project Description"
          placeholder="Tell us about your project, goals, and any specific requirements..."
          error={errors.projectDescription?.message}
          {...register('projectDescription')}
        />
      </div>
    </div>
  )
}
