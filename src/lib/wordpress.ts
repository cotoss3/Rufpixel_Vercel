import { BlogPost } from './types';
import { MOCK_BLOG_POSTS } from './mockData';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.rufpixel.com/wp-json/wp/v2';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch from WP API');
    const data = await res.json();
    return data.map((post: any) => ({
      id: String(post.id),
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
      content: post.content.rendered,
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
      categorySlug: post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'general',
      date: new Date(post.date).toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: post._embedded?.author?.[0]?.name || 'RufPixel',
      readTime: '4 min',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
      tags: []
    }));
  } catch (error) {
    // Fallback to rich mock data if WP API is not connected yet
    return MOCK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
