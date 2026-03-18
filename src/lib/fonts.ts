import localFont from 'next/font/local'
import { Inter, JetBrains_Mono } from 'next/font/google'

export const plusJakarta = localFont({
  src: [
    {
      path: '../../public/fonts/PlusJakartaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PlusJakartaSans-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})
