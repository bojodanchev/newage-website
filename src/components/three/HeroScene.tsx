'use client'

import dynamic from 'next/dynamic'

const CanvasWrapper = dynamic(
  () => import('./CanvasWrapper').then((mod) => ({ default: mod.CanvasWrapper })),
  { ssr: false }
)

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      {/* CSS gradient mesh fallback — always renders underneath */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(108, 58, 255, 0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 80% at 70% 60%, rgba(0, 229, 160, 0.08) 0%, transparent 60%)',
          ].join(', '),
        }}
      />
      {/* Three.js canvas — hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0">
        <CanvasWrapper />
      </div>
    </div>
  )
}
