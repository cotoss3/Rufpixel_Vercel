import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalizar Pedido | RufPixel Panamá',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
