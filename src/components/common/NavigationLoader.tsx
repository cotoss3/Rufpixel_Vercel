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

  // Safety timeout: auto-hide loader after 6 seconds max
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
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
    <>
      {/* 1. Top High-Visibility Glowing Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99999] h-1.5 bg-[#FF5E14] shadow-lg shadow-[#FF5E14]/60 animate-pulse pointer-events-none" />

      {/* 2. Light Backdrop Dimmer for Instant Navigation Feedback */}
      <div className="fixed inset-0 z-[99998] bg-black/15 backdrop-blur-[1px] pointer-events-none animate-fade-in" />

      {/* 3. Prominent Top-Center Floating Badge */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999] bg-[#0D0D0D] text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#FF5E14] flex items-center space-x-3 text-xs font-bold animate-fade-in pointer-events-none">
        <Loader2 className="w-4 h-4 text-[#FF5E14] animate-spin shrink-0" />
        <span className="font-outfit tracking-wide font-extrabold text-white">Cargando página...</span>
        <span className="bg-[#FF5E14]/20 text-[#FF5E14] text-[10px] px-2 py-0.5 rounded-md font-extrabold flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>RufPixel</span>
        </span>
      </div>
    </>
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderContent />
    </Suspense>
  );
}
