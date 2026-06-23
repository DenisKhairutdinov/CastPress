export interface Blog {
  id: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  date: string;
  cover: string;
  hashtags: string[];
}

interface BlogModule {
  default: Blog[];
}

async function loadAllBlogs(): Promise<Blog[]> {
  const blogModules = import.meta.glob<BlogModule>('/src/data/blog/blog.json');

  const path = '/src/data/blog/blog.json';

  if (!Object.hasOwn(blogModules, path)) {
    console.error(`Blog file not found: ${path}`);
    return [];
  }

  const module_ = await blogModules[path]();
  return module_.default;
}

export const allBlogs = await loadAllBlogs();
