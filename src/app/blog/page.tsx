import { getSortedPostsData } from '@/lib/markdown';
import Blog from '@/components/Blog';

export default async function BlogPage() {
  console.log('Blog page rendering');
  
  try {
    const posts = await getSortedPostsData();
    console.log('Fetched posts:', posts);
    console.log('Number of posts:', posts.length);
    
    return <Blog posts={posts} />;
  } catch (error) {
    console.error('Error in blog page:', error);
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Error Loading Blog Posts</h2>
            <p className="text-secondary text-lg">
              We encountered an error while loading the blog posts. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }
} 