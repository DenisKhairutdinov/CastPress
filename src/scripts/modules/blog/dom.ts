export const dom = {
  blogHeaderTitle: document.querySelector<HTMLElement>('[data-blog-header-title]'),
  blogInfo: document.querySelector<HTMLElement>('[data-blog-info]'),
  blogCoverWebp: document.querySelector<HTMLSourceElement>('[data-blog-cover-webp]'),
  blogCover: document.querySelector<HTMLImageElement>('[data-blog-cover]'),
  blogShortDescription: document.querySelector<HTMLElement>('[data-blog-short-description]'),
  blogTitle: document.querySelector<HTMLElement>('[data-blog-title]'),
  blogDescription: document.querySelector<HTMLElement>('[data-blog-description]'),
  blogHashtags: document.querySelectorAll<HTMLElement>('[data-blog-hashtag]'),
};
