'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface BeforeAfterSliderProps {
  before: string
  after: string
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percent)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onMouseUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [handleMove])

  const handleTouchStart = useCallback(() => {
    isDragging.current = true
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX)
    }
    const onTouchEnd = () => {
      isDragging.current = false
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }, [handleMove])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden border border-white/10 select-none"
    >
      {/* Before panel */}
      <div className="flex">
        <div
          className="bg-neutral-800/80 p-8 min-h-[200px] flex flex-col justify-center"
          style={{ width: `${position}%` }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent-orange mb-3">
            Before
          </span>
          <p className="text-sm text-neutral-400 leading-relaxed">{before}</p>
        </div>

        {/* After panel */}
        <div
          className="bg-neutral-900/80 p-8 min-h-[200px] flex flex-col justify-center"
          style={{ width: `${100 - position}%` }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent-mint mb-3">
            After
          </span>
          <p className="text-sm text-neutral-300 leading-relaxed">{after}</p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-accent-purple cursor-col-resize z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center',
            'shadow-lg cursor-col-resize'
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M5 3L2 8l3 5M11 3l3 5-3 5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
