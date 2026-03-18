'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full">
      <div
        className="h-full bg-gradient-to-r from-accent-purple to-accent-mint transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
