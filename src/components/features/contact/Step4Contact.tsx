import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
] as const

interface Step4ContactProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
  isSubmitting: boolean
  selectedContact?: string
}

export function Step4Contact({
  register,
  errors,
  isSubmitting,
  selectedContact,
}: Step4ContactProps) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        How can we reach you?
      </h2>
      <p className="mb-8 text-neutral-400">
        We will get back to you within 2 hours.
      </p>

      <div className="space-y-6">
        <Input
          label="Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <div className="space-y-1.5">
          <p className="block text-sm font-medium text-neutral-300">
            Preferred contact method
          </p>
          <div className="flex gap-3">
            {contactMethods.map((method) => (
              <label
                key={method.value}
                className={cn(
                  'flex-1 cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-medium transition-all duration-200',
                  selectedContact === method.value
                    ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                    : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-600'
                )}
              >
                <input
                  type="radio"
                  value={method.value}
                  {...register('preferredContact')}
                  className="sr-only"
                />
                {method.label}
              </label>
            ))}
          </div>
          {errors.preferredContact && (
            <p className="text-sm text-red-500">
              {errors.preferredContact.message}
            </p>
          )}
        </div>

        <Input
          label="Website (optional)"
          type="url"
          placeholder="https://yourcompany.com"
          error={errors.website?.message}
          {...register('website')}
        />
      </div>
    </div>
  )
}
