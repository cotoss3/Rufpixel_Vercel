import { BlogPost } from './types';
import { MOCK_BLOG_POSTS } from './mockData';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://rufpixel.com/wp-json/wp/v2';

const MONTH_MAP: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

function parseSpanishDate(dateStr: string): number {
  if (!dateStr) return 0;
  const match = dateStr.match(/(\d{1,2})\s+de\s+([a-zA-ZáéíóúÁÉÍÓÚ]+),?\s+(\d{4})/i);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthKey = match[2].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const month = MONTH_MAP[monthKey] ?? 0;
    const year = parseInt(match[3], 10);
    return new Date(year, month, day).getTime();
  }
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? 0 : parsed;
}

export function sortPostsNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const timeA = parseSpanishDate(a.date);
    const timeB = parseSpanishDate(b.date);
    if (timeB !== timeA) return timeB - timeA;
    const idA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
    const idB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
    return idB - idA;
  });
}

export async function getBlogPosts(page = 1, perPage = 24): Promise<{ posts: BlogPost[]; totalPages: number; totalPosts: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const url = `${WP_API_URL}/posts?_embed&page=1&per_page=50`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let wpPosts: BlogPost[] = [];
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        wpPosts = data.map((post: any) => ({
          id: String(post.id),
          slug: post.slug,
          title: post.title?.rendered || 'Artículo RufPixel',
          excerpt: (post.excerpt?.rendered || post.content?.rendered || '').replace(/<[^>]+>/g, '').slice(0, 155),
          content: post.content?.rendered || '',
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Impresión & Diseño',
          categorySlug: post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'general',
          date: new Date(post.date).toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' }),
          author: post._embedded?.author?.[0]?.name || 'Equipo RufPixel',
          readTime: '4 min de lectura',
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
          tags: ['RufPixel', 'Impresión']
        }));
      }
    }

    // Merge MOCK_BLOG_POSTS (our SILO SEO guides) with any extra WP posts without duplicating slugs
    const seenSlugs = new Set<string>(MOCK_BLOG_POSTS.map((p) => p.slug));
    const merged = [
      ...MOCK_BLOG_POSTS,
      ...wpPosts.filter((p) => p.slug && !seenSlugs.has(p.slug)),
    ];

    const sorted = sortPostsNewestFirst(merged);
    const startIndex = (page - 1) * perPage;
    const paginated = sorted.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(sorted.length / perPage) || 1;
    return { posts: paginated, totalPages, totalPosts: sorted.length };
  } catch (error) {
    const sortedMock = sortPostsNewestFirst(MOCK_BLOG_POSTS);
    const startIndex = (page - 1) * perPage;
    const paginatedMock = sortedMock.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(sortedMock.length / perPage) || 1;
    return { posts: paginatedMock, totalPages, totalPosts: sortedMock.length };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const localMatch = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (localMatch) return localMatch;
  const { posts } = await getBlogPosts(1, 100);
  return posts.find((p) => p.slug === slug) || null;
}
