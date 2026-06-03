const BASE_URL = 'http://localhost:3000';

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard', '/private'],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}