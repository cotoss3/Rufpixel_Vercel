import React from 'react';

export function StickerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Outer circular peel shape */}
      <path d="M21.5 12A9.5 9.5 0 1 1 12 2.5c1.8 0 3.5.5 5 1.4L21.5 12z" />
      {/* Peeled fold triangle */}
      <path d="M12 2.5C14.5 7 17 9.5 21.5 12" />
      {/* Inner dotted border following sticker contour */}
      <path 
        d="M18.8 14A7.2 7.2 0 1 1 10 5.2" 
        strokeDasharray="1.5 2" 
        strokeWidth="1.6"
      />
    </svg>
  );
}
