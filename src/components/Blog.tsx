'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '@/lib/markdown';
import { useEffect, useState } from 'react';

interface BlogProps {
  posts: BlogPost[];
}

const Blog = ({ posts = [] }: BlogProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    console.log('Blog component mounted');
    console.log('Initial posts:', posts);
    
    try {
      if (!Array.isArray(posts)) {
        throw new Error('Posts is not an array');
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Error in Blog component:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  }, [posts]);

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-secondary text-lg">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-primary text-3xl sm:text-4xl font-bold mb-4">as of late</h2>
          <p className="text-secondary max-w-2xl">
            thoughts on things, learning logs, etc.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              transition={{
                layout: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <AnimatePresence mode="popLayout">
                {(showAllPosts ? posts : posts.slice(0, 3)).map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="bg-background/80 backdrop-blur-sm border border-secondary/20 rounded-lg p-6 hover:border-primary/50 transition-colors h-full">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm text-primary">{post.category}</span>
                          <span className="text-secondary/50">•</span>
                          <span className="text-sm text-secondary/70">{post.date}</span>
                          <span className="text-secondary/50">•</span>
                          <span className="text-sm text-secondary/70">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-secondary mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium">Read more</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="mt-12 text-center">
              {posts.length > 3 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAllPosts(!showAllPosts)}
                  className="px-6 py-3 rounded-full bg-background/80 backdrop-blur-sm border border-secondary/20 text-secondary hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {showAllPosts ? 'View Less' : 'View All Posts'}
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog; 