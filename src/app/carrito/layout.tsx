import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito de Cotización | RufPixel Panamá',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CarritoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
