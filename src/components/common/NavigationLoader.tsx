'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Stop loading when route or search params change
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Safety timeout: auto-hide loader after 2.5 seconds max
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Global click listener for instant visual loading feedback
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        const targetAttr = anchor.getAttribute('target');
        
        // Skip external, new tab, hash, tel, mailto or javascript links
        if (
          targetAttr === '_blank' || 
          !href || 
          href.startsWith('#') ||
          href.startsWith('tel:') || 
          href.startsWith('mailto:') || 
          href.startsWith('javascript:') ||
          (href.startsWith('http') && !href.startsWith(window.location.origin))
        ) {
          return;
        }

        try {
          const url = new URL(anchor.href, window.location.origin);
          const currentUrl = new URL(window.location.href);

          // Trigger loading spinner if destination path or query parameters differ
          if (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search) {
            setIsLoading(true);
          }
        } catch (err) {}
      }
    };

    const handlePopState = () => {
      setIsLoading(true);
    };

    // Use capture phase so we capture clicks before any stopPropagation
    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] h-1 bg-gradient-to-r from-[#FF5E14] via-[#FF8A00] to-[#FF5E14] shadow-md shadow-[#FF5E14]/40 animate-pulse pointer-events-none" 
    />
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderContent />
    </Suspense>
  );
}
