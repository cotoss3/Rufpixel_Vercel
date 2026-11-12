'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackEvent } from '@/lib/analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RUFPIXELPA';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track SPA pageviews automatically
  useEffect(() => {
    if (!pathname) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    trackEvent('page_view', {
      page_path: url,
      page_location: typeof window !== 'undefined' ? window.location.href : url,
      page_title: typeof document !== 'undefined' ? document.title : '',
    });
  }, [pathname, searchParams]);

  // Global listener for elements tagged with data-ga-event and outbound WhatsApp/phone/mailto links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const taggedEl = target.closest('[data-ga-event]') as HTMLElement | null;
      if (taggedEl) {
        const eventName = taggedEl.getAttribute('data-ga-event') || 'ui_click';
        const label = taggedEl.getAttribute('data-ga-label') || '';
        const category = taggedEl.getAttribute('data-ga-category') || '';
        const value = taggedEl.getAttribute('data-ga-value');
        trackEvent(eventName, {
          event_category: category,
          event_label: label,
          ...(value ? { value: Number(value) } : {}),
          page_path: window.location.pathname,
        });
        return;
      }

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (anchor && anchor.href) {
        if (anchor.href.includes('wa.me') || anchor.href.includes('whatsapp.com')) {
          trackEvent('whatsapp_click', {
            click_location: anchor.getAttribute('data-ga-label') || window.location.pathname,
            link_url: anchor.href,
          });
        } else if (anchor.href.startsWith('tel:')) {
          trackEvent('phone_call_click', {
            phone_number: anchor.href.replace('tel:', ''),
            page_path: window.location.pathname,
          });
        } else if (anchor.href.startsWith('mailto:')) {
          trackEvent('email_click', {
            email_address: anchor.href.replace('mailto:', ''),
            page_path: window.location.pathname,
          });
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  return (
    <>
      {/* Initialize dataLayer and gtag safely */}
      <Script id="ga-datalayer-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });` : ''}
        `}
      </Script>
      {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-RUFPIXELPA' && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      )}
      {GTM_ID && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}
    </>
  );
}
