import { z } from 'zod'

export const contactFormSchema = z.object({
  // Step 1: Service selection
  serviceCategory: z.string().min(1, 'Please select a service category'),

  // Step 2: Business info
  industry: z.string().min(1, 'Please select your industry'),
  companySize: z.string().min(1, 'Please select company size'),
  revenueRange: z.string().optional(),

  // Step 3: Project details
  timeline: z.string().min(1, 'Please select a timeline'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters')
    .max(2000, 'Maximum 2000 characters'),

  // Step 4: Contact info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  website: z.string().url().optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

export const exitIntentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
})

export type ExitIntentFormData = z.infer<typeof exitIntentSchema>
