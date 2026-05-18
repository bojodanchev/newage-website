'use client'

import Script from 'next/script'
import { GA4_ID } from '@/lib/tracking/ga4'

export function GA4Loader() {
  if (!GA4_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
