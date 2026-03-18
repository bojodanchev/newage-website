import type { Testimonial } from '@/types/content'

export const testimonials: Testimonial[] = [
  {
    quote:
      'New Age rebuilt our entire revenue infrastructure in 12 weeks. Pipeline tripled, manual work dropped by 65%, and we finally have data we can trust. They operate at a level most agencies cannot touch.',
    name: 'Marcus Chen',
    title: 'CEO',
    company: 'StreamlineHQ',
    rating: 5,
  },
  {
    quote:
      'We were stuck at $1.8M doing everything manually. New Age automated our operations and rebuilt the funnel — we hit $4.2M run rate within two months. The ROI is not even close to debatable.',
    name: 'Sofia Reyes',
    title: 'Founder & CEO',
    company: 'Velora Living',
    rating: 5,
  },
  {
    quote:
      'Our agents went from sourcing their own leads to getting 200+ qualified prospects delivered monthly. Closings jumped from 12 to 52 per month. New Age turned our brokerage into a machine.',
    name: 'David Thornton',
    title: 'Managing Broker',
    company: 'Apex Realty Group',
    rating: 5,
  },
  {
    quote:
      'We hired New Age to build our client onboarding system. They delivered a platform that cut onboarding time from 3 weeks to 2 days and our clients actually enjoy using it. Rare to find a team that thinks about UX and systems equally.',
    name: 'Rachel Torres',
    title: 'COO',
    company: 'Prism Digital Agency',
    rating: 5,
  },
  {
    quote:
      'Building compliant software in healthcare is notoriously difficult. New Age delivered our patient portal on time, on budget, and passed our security audit on the first attempt. Solid engineering and clear communication throughout.',
    name: 'Dr. Anil Mehta',
    title: 'CTO',
    company: 'Clarity Health',
    rating: 4,
  },
  {
    quote:
      'New Age automated our entire reporting pipeline — what used to take our finance team 20 hours a week now runs in the background. The dashboards they built give me real-time visibility into every business unit. Worth every dollar.',
    name: 'Lauren Mitchell',
    title: 'VP of Finance',
    company: 'Northpoint Capital',
    rating: 5,
  },
]

export function getAllTestimonials(): Testimonial[] {
  return testimonials
}
