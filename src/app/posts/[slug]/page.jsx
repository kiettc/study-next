import { Thumbnail } from '@/imgs';
import Image from 'next/image';

export async function generateMetadata({ params }) {
    const { slug } = await params; 
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
    const post = await response.json();

    if (!response.ok) {
        return {
            title: "Post not found",
            description: "Post not found",
        };
    }

    return {
        title: post.title,
        description: post.content,
    };
}

async function PostPage({ params }) {
    const { slug } = await params;
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
    const post = await response.json();

    if (!response.ok) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Slug: {post.slug}</p>
            <Image src={Thumbnail} alt="Thumbnail" width={500} height={500} />
        </div>
    );
}

export default PostPage;