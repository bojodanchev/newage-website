import { useTranslations } from 'next-intl'
import { Select } from '@/components/ui/Select'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const industryKeys = ['saas', 'ecommerce', 'realEstate', 'healthcare', 'finance', 'agency', 'other'] as const
const industryValues = ['saas', 'ecommerce', 'real-estate', 'healthcare', 'finance', 'agency', 'other'] as const

const companySizeValues = ['1-5', '6-20', '21-50', '51-200', '200+'] as const

const revenueKeys = ['preRevenue', 'under100k', '100k500k', '500k1m', '1m5m', '5mPlus'] as const
const revenueValues = ['pre-revenue', 'under-100k', '100k-500k', '500k-1m', '1m-5m', '5m+'] as const

interface Step2BusinessProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

export function Step2Business({ register, errors }: Step2BusinessProps) {
  const t = useTranslations('contact')

  const industries = industryKeys.map((key, i) => ({
    value: industryValues[i],
    label: t(`form.step2.industries.${key}`),
  }))

  const companySizes = companySizeValues.map((val) => ({
    value: val,
    label: t(`form.step2.companySizes.${val}`),
  }))

  const revenueRanges = revenueKeys.map((key, i) => ({
    value: revenueValues[i],
    label: t(`form.step2.revenues.${key}`),
  }))

  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        {t('form.step2.title')}
      </h2>
      <p className="mb-8 text-neutral-400">
        {t('form.step2.description')}
      </p>

      <div className="space-y-6">
        <Select
          label={t('form.step2.industryLabel')}
          placeholder={t('form.step2.industryPlaceholder')}
          options={industries}
          error={errors.industry?.message}
          {...register('industry')}
        />

        <Select
          label={t('form.step2.companySizeLabel')}
          placeholder={t('form.step2.companySizePlaceholder')}
          options={companySizes}
          error={errors.companySize?.message}
          {...register('companySize')}
        />

        <Select
          label={t('form.step2.revenueLabel')}
          placeholder={t('form.step2.revenuePlaceholder')}
          options={revenueRanges}
          {...register('revenueRange')}
        />
      </div>
    </div>
  )
}
