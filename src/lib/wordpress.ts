import { BlogPost } from './types';
import { MOCK_BLOG_POSTS } from './mockData';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://rufpixel.com/wp-json/wp/v2';

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

    // Merge MOCK_BLOG_POSTS (our 15 SILO SEO guides) with any extra WP posts without duplicating slugs
    const seenSlugs = new Set<string>(MOCK_BLOG_POSTS.map((p) => p.slug));
    const merged = [
      ...MOCK_BLOG_POSTS,
      ...wpPosts.filter((p) => p.slug && !seenSlugs.has(p.slug)),
    ];

    const startIndex = (page - 1) * perPage;
    const paginated = merged.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(merged.length / perPage) || 1;
    return { posts: paginated, totalPages, totalPosts: merged.length };
  } catch (error) {
    const startIndex = (page - 1) * perPage;
    const paginatedMock = MOCK_BLOG_POSTS.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(MOCK_BLOG_POSTS.length / perPage) || 1;
    return { posts: paginatedMock, totalPages, totalPosts: MOCK_BLOG_POSTS.length };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const localMatch = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (localMatch) return localMatch;
  const { posts } = await getBlogPosts(1, 100);
  return posts.find((p) => p.slug === slug) || null;
}
