import { BlogPost } from './types';
import { MOCK_BLOG_POSTS } from './mockData';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://rufpixel.com/wp-json/wp/v2';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed`, {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return MOCK_BLOG_POSTS;
    }
    return data.map((post: any) => ({
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
  } catch (error) {
    console.warn('Error fetching live WordPress blog posts:', error);
    return MOCK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
