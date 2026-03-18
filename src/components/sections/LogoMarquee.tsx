import { cn } from '@/lib/utils'

interface LogoMarqueeProps {
  items: string[]
  className?: string
}

export function LogoMarquee({ items, className }: LogoMarqueeProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        className
      )}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-primary to-transparent" />

      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {/* First copy */}
        <div className="flex shrink-0">
          {items.map((name, i) => (
            <span
              key={`a-${i}`}
              className="flex shrink-0 items-center px-8 py-4 text-sm font-medium text-neutral-500"
            >
              {name}
            </span>
          ))}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0">
          {items.map((name, i) => (
            <span
              key={`b-${i}`}
              className="flex shrink-0 items-center px-8 py-4 text-sm font-medium text-neutral-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
