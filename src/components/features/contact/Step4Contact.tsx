import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const contactMethodKeys = ['email', 'phone', 'whatsapp'] as const

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
  const t = useTranslations('contact')

  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        {t('form.step4.title')}
      </h2>
      <p className="mb-8 text-neutral-400">
        {t('form.step4.description')}
      </p>

      <div className="space-y-6">
        <Input
          label={t('form.step4.nameLabel')}
          placeholder={t('form.step4.namePlaceholder')}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label={t('form.step4.emailLabel')}
          type="email"
          placeholder={t('form.step4.emailPlaceholder')}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label={t('form.step4.phoneLabel')}
          type="tel"
          placeholder={t('form.step4.phonePlaceholder')}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <div className="space-y-1.5">
          <p className="block text-sm font-medium text-neutral-300">
            {t('form.step4.preferredContactLabel')}
          </p>
          <div className="flex gap-3">
            {contactMethodKeys.map((method) => (
              <label
                key={method}
                className={cn(
                  'flex-1 cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-medium transition-all duration-200',
                  selectedContact === method
                    ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                    : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-600'
                )}
              >
                <input
                  type="radio"
                  value={method}
                  {...register('preferredContact')}
                  className="sr-only"
                />
                {t(`form.step4.contactMethods.${method}`)}
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
          label={t('form.step4.websiteLabel')}
          type="url"
          placeholder={t('form.step4.websitePlaceholder')}
          error={errors.website?.message}
          {...register('website')}
        />
      </div>
    </div>
  )
}
