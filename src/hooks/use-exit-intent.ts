'use client'

import { useState, useEffect, useCallback } from 'react'

export function useExitIntent(options?: {
  delay?: number
  excludePaths?: string[]
}) {
  const { delay = 5000, excludePaths = ['/contact'] } = options || {}
  const [showPopup, setShowPopup] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) {
      setShowPopup(true)
      sessionStorage.setItem('exit-intent-shown', 'true')
    }
  }, [])

  const dismiss = useCallback(() => {
    setShowPopup(false)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('exit-intent-shown')) return
    if (excludePaths.some((path) => window.location.pathname.startsWith(path)))
      return

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, delay)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [delay, excludePaths, handleMouseLeave])

  return { showPopup, dismiss }
}
