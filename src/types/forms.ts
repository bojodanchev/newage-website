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

export const metaAdsLeadSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email required'),
    company: z.string().min(1, 'Company is required'),
    website: z.string().url('Valid URL').optional().or(z.literal('')),
    monthlyRevenue: z.string().min(1, 'Monthly revenue is required'),
    monthlyAdSpend: z.string().min(1, 'Monthly ad spend is required'),
    biggestBottleneck: z
      .string()
      .min(8, 'Tell us a bit more about your bottleneck')
      .max(2000, 'Max 2000 characters'),
    website_url: z.string().optional(),
    renderedAt: z.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.website_url && data.website_url.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'spam_detected',
        path: ['website_url'],
      })
    }
    if (data.renderedAt && Date.now() - data.renderedAt < 1500) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'too_fast',
        path: ['renderedAt'],
      })
    }
  })

export type MetaAdsLeadFormData = z.infer<typeof metaAdsLeadSchema>

/**
 * 3-tier conversion system lead form (/start, /grow, /scale).
 *
 * One schema, tier-conditional requirements:
 *  - start (beginner): phone-first, email optional, low friction
 *  - grow (intermediate) / scale (pro): email required
 * Tier-specific fields are optional at the schema level and validated per tier
 * in superRefine; the API stores them in `extra`.
 */
export const tierLeadSchema = z
  .object({
    tier: z.enum(['start', 'grow', 'scale']),
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email required').optional().or(z.literal('')),
    phone: z.string().min(4, 'Valid phone required').optional().or(z.literal('')),
    preferredTime: z.string().max(200).optional().or(z.literal('')),

    // start
    businessType: z.string().max(200).optional().or(z.literal('')),
    biggestChallenge: z.string().max(2000).optional().or(z.literal('')),

    // grow
    company: z.string().max(200).optional().or(z.literal('')),
    monthlyAdBudget: z.string().max(200).optional().or(z.literal('')),
    currentSituation: z.string().max(2000).optional().or(z.literal('')),

    // scale
    role: z.string().max(200).optional().or(z.literal('')),
    annualRevenue: z.string().max(200).optional().or(z.literal('')),
    primaryChallenge: z.string().max(2000).optional().or(z.literal('')),

    // meta
    locale: z.string().max(8).optional(),
    sourceUrl: z.string().max(500).optional(),

    // spam guards
    website_url: z.string().optional(), // honeypot
    renderedAt: z.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.website_url && data.website_url.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'spam_detected',
        path: ['website_url'],
      })
    }
    if (data.renderedAt && Date.now() - data.renderedAt < 1500) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'too_fast',
        path: ['renderedAt'],
      })
    }
    if (data.tier === 'start') {
      if (!data.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Phone is required',
          path: ['phone'],
        })
      }
    } else if (!data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email is required',
        path: ['email'],
      })
    }
  })

export type TierLeadFormData = z.infer<typeof tierLeadSchema>
