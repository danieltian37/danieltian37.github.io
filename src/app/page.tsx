import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import { getSortedPostsData } from '@/lib/markdown';

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <main className="min-h-screen">
      <Navbar />
      <About />
      <Blog posts={posts} />
      <Contact />
    </main>
  );
}
