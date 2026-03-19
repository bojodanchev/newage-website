import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { ExitIntentPopup } from '@/components/features/ExitIntentPopup'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
