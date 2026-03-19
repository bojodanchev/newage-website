'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types/content'

interface PricingTableProps {
  tiers: PricingTier[]
}

export function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            'relative bg-white/5 backdrop-blur-xl border rounded-xl p-6 transition-all duration-300',
            tier.highlighted
              ? 'border-accent-purple glow-purple'
              : 'border-white/10 hover:border-accent-purple/30'
          )}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-purple text-white text-xs font-bold px-4 py-1 rounded-full">
              Most Popular
            </span>
          )}
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">
            {tier.name}
          </h3>
          <p className="text-3xl font-bold gradient-text mb-2">
            {tier.price}
          </p>
          <p className="text-sm text-neutral-400 mb-6">
            {tier.description}
          </p>
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                <svg
                  className="shrink-0 mt-0.5 w-4 h-4 text-accent-mint"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 8l3.5 3.5L13 5" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={cn(
              'block w-full text-center rounded-lg px-6 py-3 font-medium transition-all duration-300',
              tier.highlighted
                ? 'bg-gradient-to-r from-accent-purple to-accent-mint text-white hover:glow-purple hover:scale-[1.02]'
                : 'border border-neutral-700 text-foreground hover:border-accent-purple hover:text-accent-purple'
            )}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  )
}
