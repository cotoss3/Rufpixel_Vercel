import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Cuenta y Estado de Pedido | RufPixel Panamá',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
