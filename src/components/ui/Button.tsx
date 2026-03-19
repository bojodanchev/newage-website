'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gradient'
type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsLink = BaseProps & {
  href: string
  onClick?: () => void
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent-purple to-accent-mint text-white hover:glow-purple shadow-lg shadow-accent-purple/20',
  secondary:
    'border border-neutral-500 text-foreground hover:border-accent-purple hover:text-accent-purple bg-white/5',
  ghost: 'text-foreground hover:bg-white/5',
  gradient:
    'bg-gradient-to-r from-accent-purple via-accent-mint to-accent-orange text-white hover:glow-purple',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap',
    'transition-all duration-300 ease-out',
    'hover:scale-[1.02] active:scale-[0.98]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-purple',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if ('href' in props && props.href) {
    const { href, onClick, ...rest } = props as ButtonAsLink
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    )
  }

  const { ...rest } = props as ButtonAsButton
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
