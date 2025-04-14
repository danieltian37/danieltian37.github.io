import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  slug: string;
}

type BlogPostData = {
  id: string;
  date: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  slug: string;
};

function createSlug(date: string, id: string, posts: BlogPostData[]): string {
  const formattedDate = date.split('T')[0]; // Remove time if present
  const postsOnSameDay = posts.filter(p => p.date.split('T')[0] === formattedDate);
  const postIndex = postsOnSameDay.findIndex(p => p.id === id) + 1;
  return `${formattedDate}-${postIndex}`;
}

export async function getSortedPostsData(): Promise<BlogPost[]> {
  console.log('getSortedPostsData: Starting');
  console.log('Current working directory:', process.cwd());
  
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  console.log('Posts directory:', postsDirectory);
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    console.log('Found files:', fileNames);

    // First pass: collect all posts without slugs
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          try {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            console.log('Processing file:', fullPath);

            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const requiredFields = ['title', 'date', 'readTime', 'category', 'excerpt'];
            const missingFields = requiredFields.filter(field => !matterResult.data[field]);
            
            if (missingFields.length > 0) {
              console.error(`Missing required fields in ${fileName}:`, missingFields);
              return null;
            }

            const postData: BlogPostData = {
              id,
              title: matterResult.data.title,
              date: matterResult.data.date,
              readTime: matterResult.data.readTime,
              category: matterResult.data.category,
              excerpt: matterResult.data.excerpt,
              content: matterResult.content,
              slug: '', // Will be set in the second pass
            };

            return postData;
          } catch (error) {
            console.error(`Error processing file ${fileName}:`, error);
            return null;
          }
        })
    );

    const validPosts = allPostsData.filter((post): post is BlogPostData => post !== null);
    
    // Second pass: create slugs based on post order for each day
    const postsWithSlugs = validPosts.map(post => ({
      ...post,
      slug: createSlug(post.date, post.id, validPosts),
    }));

    console.log('Number of valid posts:', postsWithSlugs.length);
    console.log('Valid posts:', postsWithSlugs);

    return postsWithSlugs.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error in getSortedPostsData:', error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const posts = await getSortedPostsData();
  
  // Find the post with matching slug
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;

  const fullPath = path.join(postsDirectory, `${post.id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...post,
    content: contentHtml,
  };
} 