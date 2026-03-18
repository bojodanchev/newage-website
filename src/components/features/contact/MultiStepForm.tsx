'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/types/forms'
import { cn } from '@/lib/utils'
import { FormProgress } from './FormProgress'
import { Step1Service } from './Step1Service'
import { Step2Business } from './Step2Business'
import { Step3Project } from './Step3Project'
import { Step4Contact } from './Step4Contact'

const stepFields: (keyof ContactFormData)[][] = [
  ['serviceCategory'],
  ['industry', 'companySize'],
  ['timeline', 'budgetRange', 'projectDescription'],
  ['name', 'email', 'preferredContact'],
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      serviceCategory: '',
      industry: '',
      companySize: '',
      revenueRange: '',
      timeline: '',
      budgetRange: '',
      projectDescription: '',
      name: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      website: '',
    },
  })

  const watchedService = watch('serviceCategory')
  const watchedContact = watch('preferredContact')

  async function goNext() {
    const fieldsToValidate = stepFields[currentStep - 1]
    const isValid = await trigger(fieldsToValidate)
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  function goBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-mint/20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-mint">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          Thank You!
        </h3>
        <p className="mt-3 text-neutral-400">
          We have received your submission and will get back to you within 2
          hours during business hours.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10">
      <FormProgress currentStep={currentStep} totalSteps={4} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cn(
            'transition-opacity duration-300',
            isSubmitting && 'pointer-events-none opacity-60'
          )}
        >
          {currentStep === 1 && (
            <Step1Service
              register={register}
              errors={errors}
              selectedValue={watchedService}
            />
          )}
          {currentStep === 2 && (
            <Step2Business register={register} errors={errors} />
          )}
          {currentStep === 3 && (
            <Step3Project register={register} errors={errors} />
          )}
          {currentStep === 4 && (
            <Step4Contact
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              selectedContact={watchedContact}
            />
          )}
        </div>

        {submitStatus === 'error' && (
          <p className="mt-4 text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="rounded-lg px-6 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-foreground"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className={cn(
                'rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-8 py-3 text-sm font-medium text-white',
                'transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]'
              )}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'rounded-lg bg-gradient-to-r from-accent-purple to-accent-mint px-8 py-3 text-sm font-medium text-white',
                'transition-all duration-300 hover:scale-[1.02] hover:glow-purple active:scale-[0.98]',
                'disabled:opacity-50 disabled:pointer-events-none'
              )}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
