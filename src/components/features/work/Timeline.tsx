import { FadeIn } from '@/components/animation/FadeIn'
import type { TimelineItem } from '@/types/content'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Connecting line */}
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-accent-purple/30" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <div className="relative">
              {/* Dot */}
              <div className="absolute -left-8 md:-left-12 top-1 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent-purple" />
              </div>

              {/* Content */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <p className="text-xs text-accent-purple font-mono mb-1">
                  {item.date}
                </p>
                <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
