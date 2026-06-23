import { dom } from './dom';
import { handlers } from './handlers';
import { allBlogs } from '../_blog/load-blog';

function initBlog() {
  const {
    blogHeaderTitle,
    blogInfo,
    blogCoverWebp,
    blogCover,
    blogShortDescription,
    blogTitle,
    blogDescription,
    blogHashtags,
  } = dom;

  if (
    !blogHeaderTitle ||
    !blogInfo ||
    !blogCoverWebp ||
    !blogCover ||
    !blogShortDescription ||
    !blogTitle ||
    !blogDescription ||
    !blogHashtags
  ) {
    return;
  }

  const id = Number(new URLSearchParams(location.search).get('id')) - 1;

  if (id >= 0 && id < allBlogs.length) {
    handlers.loadBlogCover(blogCover, blogCoverWebp, allBlogs[id]);
    handlers.loadBlogTitle(blogHeaderTitle, allBlogs[id]);
    handlers.loadBlogInfo(blogInfo, allBlogs[id]);
    handlers.loadBlogShortDescription(blogShortDescription, allBlogs[id]);
    handlers.loadBlogTitle(blogTitle, allBlogs[id]);
    handlers.loadBlogDescription(blogDescription, allBlogs[id]);
    handlers.loadBlogHashtags(blogHashtags, allBlogs[id]);
  }
}
initBlog();
