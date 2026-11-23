import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | RufPixel Panamá',
  description: 'Taller de impresión, bordado, grabado láser y artículos promocionales en Panamá.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
