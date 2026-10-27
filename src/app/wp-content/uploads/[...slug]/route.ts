import { NextRequest, NextResponse } from 'next/server';
import http from 'http';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const filePath = (params.slug || []).join('/');

  return new Promise<NextResponse>((resolve) => {
    const req = http.request(
      {
        hostname: '204.93.224.58',
        port: 80,
        path: `/wp-content/uploads/${encodeURI(filePath)}`,
        method: 'GET',
        headers: {
          Host: 'rufpixel.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RufPixel-EdgeProxy/1.0',
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          resolve(new NextResponse('Image not found', { status: 404 }));
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = res.headers['content-type'] || 'image/jpeg';

          resolve(
            new NextResponse(buffer, {
              status: 200,
              headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
              },
            })
          );
        });
      }
    );

    req.on('error', (err) => {
      console.error('Image proxy connection error:', err);
      resolve(new NextResponse('Image proxy connection error', { status: 502 }));
    });

    req.end();
  });
}
