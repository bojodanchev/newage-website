import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE.name}. Please read these terms carefully before using our services.`,
  path: '/terms',
  noIndex: true,
})

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Last updated: January 1, 2024
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Acceptance of Terms
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          By accessing or using the services provided by {SITE.name} (&quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our services.
          We reserve the right to update these terms at any time, with changes
          effective upon posting.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Services
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          {SITE.name} provides software development, business automation,
          marketing systems, sales infrastructure, and related consulting
          services. The specific scope, deliverables, timeline, and pricing for
          each engagement are defined in a separate Statement of Work (SOW) or
          proposal agreed upon by both parties prior to project commencement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Payment Terms
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          Payment terms are specified in each project proposal or SOW. Unless
          otherwise agreed, a 50% deposit is required before work begins, with
          the remaining balance due upon project completion. Invoices are due
          within 14 days of issuance. Late payments may incur a 1.5% monthly
          interest charge. All prices are in USD unless otherwise specified.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Intellectual Property
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          Upon full payment, the client receives full ownership of all custom
          work product created specifically for their project, including source
          code, designs, and documentation. {SITE.name} retains the right to
          use general knowledge, techniques, and non-client-specific components
          developed during the engagement. Pre-existing tools, libraries, and
          frameworks remain the property of their respective owners.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Limitation of Liability
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          To the maximum extent permitted by law, {SITE.name} shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising from or related to the use of our services.
          Our total liability for any claim shall not exceed the total fees paid
          by the client for the specific engagement giving rise to the claim.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Termination
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          Either party may terminate an engagement with 14 days written notice.
          Upon termination, the client is responsible for payment of all work
          completed up to the termination date. We will deliver all completed
          work product and provide reasonable transition support. Refunds for
          unused portions of prepaid services will be evaluated on a
          case-by-case basis.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Governing Law
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          These Terms of Service shall be governed by and construed in
          accordance with the laws of the State of Delaware, United States,
          without regard to its conflict of law provisions. Any disputes arising
          from these terms shall be resolved through binding arbitration in
          accordance with the rules of the American Arbitration Association.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Contact
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          For questions about these Terms of Service, please contact us at{' '}
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
