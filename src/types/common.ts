import type { ReactNode } from 'react'

export interface WithChildren {
  children: ReactNode
}

export interface WithClassName {
  className?: string
}

export interface PageProps {
  params: Promise<{ slug: string }>
}

export type PropsWithClassName<T = object> = T & WithClassName
