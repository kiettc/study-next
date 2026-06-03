import { NextResponse } from "next/server";

let posts = [
    { id: 1, slug: "first-post", title: "First Post", content: "This is the first post." },
    { id: 2, slug: "second-post", title: "Second Post", content: "This is the second post." },
    { id: 3, slug: "third-post", title: "Third Post", content: "This is the third post." },
];

export async function GET(request, { params }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
}

export async function PUT(request, { params }) {
    const { slug } = await params;
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    posts[index] = { ...posts[index], title, content };

    return NextResponse.json(posts[index], { status: 200 });
}

export async function DELETE(request, { params }) {
    const { slug } = await params;
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const deleted = posts.splice(index, 1)[0];

    return NextResponse.json({ message: "Post deleted", post: deleted }, { status: 200 });
}
