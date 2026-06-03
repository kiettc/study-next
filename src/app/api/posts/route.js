import { NextResponse } from "next/server";

let posts = [
    { id: 1, 
        slug: "first-post", 
        title: "First Post", 
        content: "This is the first post.", 
        lastModified: '2026-06-03T12:00:00.000Z' 
    },
    { 
        id: 2, 
        slug: "second-post", 
        title: "Second Post", 
        content: "This is the second post.", 
        lastModified: '2026-06-03T12:00:00.000Z' 
    },
    { 
        id: 3, 
        slug: "third-post", 
        title: "Third Post", 
        content: "This is the third post.", 
        lastModified: '2026-06-03T12:00:00.000Z' 
    }
];

export async function GET() {
    return NextResponse.json(posts, { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
    const exists = posts.find((p) => p.slug === slug);

    if (exists) {
        return NextResponse.json({ error: "Post with this title already exists" }, { status: 409 });
    }

    const newPost = {
        id: posts.length + 1,
        slug,
        title,
        content,
        lastModified: new Date().toISOString(),
    };
    posts.push(newPost);

    return NextResponse.json(newPost, { status: 201 });
}
