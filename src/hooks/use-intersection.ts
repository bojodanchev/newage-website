'use client'

import { useRef, useState, useEffect } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersection<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(node)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}
