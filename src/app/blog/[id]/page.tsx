import { getPostData, getSortedPostsData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostData(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>back</span>
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-secondary">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span className="text-primary">{post.category}</span>
        </div>
      </header>

      <div 
        className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-[rgb(30,25,35)]
          prose-p:text-[rgb(30,25,35)]
          prose-strong:text-[rgb(30,25,35)]
          prose-a:text-primary hover:prose-a:text-primary/80 
          prose-code:text-primary 
          prose-pre:bg-[rgb(240,235,245)]
          prose-pre:text-[rgb(30,25,35)]
          prose-pre:border prose-pre:border-secondary/20
          prose-ul:text-[rgb(30,25,35)]
          prose-ol:text-[rgb(30,25,35)]
          prose-li:text-[rgb(30,25,35)]
          prose-blockquote:text-[rgb(30,25,35)]
          prose-hr:border-secondary/20
          prose-em:text-[rgb(30,25,35)]
          prose-strong:text-[rgb(30,25,35)]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
} 