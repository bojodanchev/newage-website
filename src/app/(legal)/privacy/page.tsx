import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE.name}. Learn how we collect, use, and protect your information.`,
  path: '/privacy',
  noIndex: true,
})

export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: January 1, 2024
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Information Collection
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          We collect information you provide directly when using our services,
          including your name, email address, phone number, company details, and
          project information submitted through our contact forms. We also
          collect usage data automatically, including IP addresses, browser type,
          pages visited, and time spent on our site.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Use of Information
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          We use collected information to provide and improve our services,
          respond to inquiries, send project updates and relevant communications,
          analyze site usage to enhance user experience, and comply with legal
          obligations. We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Cookies
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          We use essential cookies to ensure our website functions properly and
          analytics cookies to understand how visitors interact with our site.
          You can control cookie preferences through your browser settings.
          Disabling cookies may affect the functionality of certain features.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Third-Party Services
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          We use third-party services for analytics (Google Analytics), email
          delivery (Resend), hosting (Vercel), and payment processing (Stripe).
          These services may collect and process data according to their own
          privacy policies. We encourage you to review the privacy policies of
          any third-party services we integrate with.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Data Security
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          We implement industry-standard security measures to protect your
          information, including encryption in transit (TLS/SSL), secure hosting
          infrastructure, and access controls. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Your Rights
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          You have the right to access, update, or delete your personal
          information at any time. You may also opt out of marketing
          communications by clicking the unsubscribe link in any email or by
          contacting us directly. For data deletion requests or any privacy
          concerns, please contact us using the information below.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Contact Us
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          If you have questions about this Privacy Policy or our data practices,
          please contact us at{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent-purple underline underline-offset-2 transition-colors hover:text-accent-mint"
          >
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </div>
  )
}
