import { BlogPost } from './types';
import { MOCK_BLOG_POSTS } from './mockData';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://rufpixel.com/wp-json/wp/v2';

export async function getBlogPosts(page = 1, perPage = 15): Promise<{ posts: BlogPost[]; totalPages: number; totalPosts: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const url = `${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    const totalPosts = parseInt(res.headers.get('x-wp-total') || '15', 10);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return { posts: MOCK_BLOG_POSTS, totalPages: 1, totalPosts: MOCK_BLOG_POSTS.length };
    }

    const posts = data.map((post: any) => ({
      id: String(post.id),
      slug: post.slug,
      title: post.title?.rendered || 'Artículo RufPixel',
      excerpt: (post.excerpt?.rendered || post.content?.rendered || '').replace(/<[^>]+>/g, '').slice(0, 160) + '...',
      content: post.content?.rendered || '',
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Impresión & Diseño',
      categorySlug: post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'general',
      date: new Date(post.date).toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: post._embedded?.author?.[0]?.name || 'Equipo RufPixel',
      readTime: '4 min de lectura',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
      tags: ['RufPixel', 'Impresión']
    }));

    return { posts, totalPages, totalPosts };
  } catch (error) {
    console.warn('Error fetching live WordPress blog posts (using mock fallback):', error);
    const startIndex = (page - 1) * perPage;
    const paginatedMock = MOCK_BLOG_POSTS.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(MOCK_BLOG_POSTS.length / perPage) || 1;
    return { posts: paginatedMock, totalPages, totalPosts: MOCK_BLOG_POSTS.length };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { posts } = await getBlogPosts(1, 100);
  return posts.find((p) => p.slug === slug) || null;
}
