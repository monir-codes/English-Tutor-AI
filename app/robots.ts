import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
      ],
    },
    sitemap: 'https://english-tutor-ai.vercel.app/sitemap.xml',
  };
}
