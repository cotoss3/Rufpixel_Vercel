'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Listen to path or searchParam changes to stop loading
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Listen to global click events on internal links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        // Only trigger loading spinner if navigating to a new path
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  if (!isLoading) return null;

  return (
    <>
      {/* Top Loading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#FF5E14] animate-pulse shadow-md shadow-[#FF5E14]/50" />

      {/* Floating Center Spinner Overlay */}
      <div className="fixed bottom-6 right-6 z-50 bg-[#0D0D0D] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#FF5E14]/40 animate-bounce">
        <Loader2 className="w-5 h-5 text-[#FF5E14] animate-spin" />
        <span className="text-xs font-extrabold tracking-wide">Cargando RufPixel...</span>
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
