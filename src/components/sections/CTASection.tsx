import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  headline: string
  subheadline?: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  className?: string
}

export function CTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        'w-full border-t border-b border-neutral-700/30 bg-neutral-800/30',
        'section-padding text-center',
        className
      )}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-heading text-2xl font-bold gradient-text md:text-4xl">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 text-lg text-neutral-400">{subheadline}</p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCTA.href}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-medium',
              'bg-gradient-to-r from-accent-purple to-accent-mint text-white',
              'transition-all duration-300 hover:scale-[1.02] hover:glow-purple',
              'active:scale-[0.98]'
            )}
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-medium',
                'text-foreground transition-all duration-300 hover:bg-white/5',
                'active:scale-[0.98]'
              )}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
