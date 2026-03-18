import type { Testimonial } from '@/types/content'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, name, title, company, avatar, rating } = testimonial

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      {/* Quote icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="mb-4 text-accent-purple/30"
      >
        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
      </svg>

      {/* Quote */}
      <p className="text-lg italic leading-relaxed text-neutral-200">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Rating */}
      {rating != null && rating > 0 && (
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill={i < rating ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
              className={i < rating ? 'text-accent-orange' : 'text-neutral-600'}
            >
              <path d="M8 1.5l1.85 3.75L14 5.9l-2.75 2.675.65 3.8L8 10.4l-3.9 1.975.65-3.8L2 5.9l4.15-.65z" />
            </svg>
          ))}
        </div>
      )}

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/20 text-sm font-semibold text-accent-purple">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-neutral-500">
            {title}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}
