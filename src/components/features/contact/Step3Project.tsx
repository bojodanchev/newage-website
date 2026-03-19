import { useTranslations } from 'next-intl'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactFormData } from '@/types/forms'

const timelineKeys = ['asap', '1-2months', '3-6months', '6plusMonths', 'notSure'] as const
const timelineValues = ['asap', '1-2-months', '3-6-months', '6+-months', 'not-sure'] as const

const budgetKeys = ['5k10k', '10k25k', '25k50k', '50k100k', '100kPlus'] as const
const budgetValues = ['5k-10k', '10k-25k', '25k-50k', '50k-100k', '100k+'] as const

interface Step3ProjectProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

export function Step3Project({ register, errors }: Step3ProjectProps) {
  const t = useTranslations('contact')

  const timelines = timelineKeys.map((key, i) => ({
    value: timelineValues[i],
    label: t(`form.step3.timelines.${key}`),
  }))

  const budgets = budgetKeys.map((key, i) => ({
    value: budgetValues[i],
    label: t(`form.step3.budgets.${key}`),
  }))

  return (
    <div>
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
        {t('form.step3.title')}
      </h2>
      <p className="mb-8 text-neutral-400">
        {t('form.step3.description')}
      </p>

      <div className="space-y-6">
        <Select
          label={t('form.step3.timelineLabel')}
          placeholder={t('form.step3.timelinePlaceholder')}
          options={timelines}
          error={errors.timeline?.message}
          {...register('timeline')}
        />

        <Select
          label={t('form.step3.budgetLabel')}
          placeholder={t('form.step3.budgetPlaceholder')}
          options={budgets}
          error={errors.budgetRange?.message}
          {...register('budgetRange')}
        />

        <Textarea
          label={t('form.step3.descriptionLabel')}
          placeholder={t('form.step3.descriptionPlaceholder')}
          error={errors.projectDescription?.message}
          {...register('projectDescription')}
        />
      </div>
    </div>
  )
}
