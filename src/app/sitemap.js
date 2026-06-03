const BASE_URL = 'http://localhost:3000';

export default async function sitemap() {
    // Get all posts from the API
    const response = await fetch(`${BASE_URL}/api/posts`);
    const posts = await response.json();

    // Create an array of URLs for each post
    const postUrls = posts.map((post) => {
        return {
            url: `${BASE_URL}/posts/${post.slug}`,
            lastModified: new Date(post.lastModified).toISOString(),
        };
    });

    return [
        {
            url: BASE_URL,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${BASE_URL}/dashboard`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${BASE_URL}/login`,
            lastModified: new Date().toISOString(),
        },
        ...postUrls,
    ];
}