'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(newLocale: 'en' | 'bg') {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-0.5">
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-medium transition-all',
          locale === 'en'
            ? 'bg-accent-purple text-white'
            : 'text-neutral-400 hover:text-foreground'
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('bg')}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-medium transition-all',
          locale === 'bg'
            ? 'bg-accent-purple text-white'
            : 'text-neutral-400 hover:text-foreground'
        )}
      >
        BG
      </button>
    </div>
  )
}
