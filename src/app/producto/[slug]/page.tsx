import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://rufpixel.com/productos/${params.slug}/`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LegacyProductPage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/productos/${params.slug}`);
}
