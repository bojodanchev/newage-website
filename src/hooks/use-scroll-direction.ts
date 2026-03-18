'use client'

import { useState, useEffect, useRef } from 'react'

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastY = useRef(0)

  useEffect(() => {
    const threshold = 10

    const handleScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY.current) < threshold) return

      setDirection(y > lastY.current ? 'down' : 'up')
      lastY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
