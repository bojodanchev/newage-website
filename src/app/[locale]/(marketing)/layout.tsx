import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { ExitIntentPopup } from '@/components/features/ExitIntentPopup'

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <ExitIntentPopup />
    </>
  )
}
