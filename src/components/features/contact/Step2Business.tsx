import { Select } from '@/components/ui/Select'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const industries = [
  { value: 'saas', label: 'SaaS' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'agency', label: 'Agency' },
  { value: 'other', label: 'Other' },
]

const companySizes = [
  { value: '1-5', label: '1-5 employees' },
  { value: '6-20', label: '6-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '200+', label: '200+ employees' },
]

const revenueRanges = [
  { value: 'pre-revenue', label: 'Pre-revenue' },
  { value: 'under-100k', label: 'Under $100K' },
  { value: '100k-500k', label: '$100K - $500K' },
  { value: '500k-1m', label: '$500K - $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m+', label: '$5M+' },
]

interface Step2BusinessProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

export function Step2Business({ register, errors }: Step2BusinessProps) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        Tell us about your business
      </h2>
      <p className="mb-8 text-neutral-400">
        This helps us tailor our approach to your specific situation.
      </p>

      <div className="space-y-6">
        <Select
          label="Industry"
          placeholder="Select your industry"
          options={industries}
          error={errors.industry?.message}
          {...register('industry')}
        />

        <Select
          label="Company Size"
          placeholder="Select company size"
          options={companySizes}
          error={errors.companySize?.message}
          {...register('companySize')}
        />

        <Select
          label="Revenue Range (optional)"
          placeholder="Select revenue range"
          options={revenueRanges}
          {...register('revenueRange')}
        />
      </div>
    </div>
  )
}
