import type { Blog as BlogData } from '../_blog/load-blog';

class Blog {
  id: number;
  cover: string;
  date: string;
  title: string;

  constructor({ id, cover, date, title }: BlogData) {
    this.id = id;
    this.cover = cover;
    this.date = date;
    this.title = title;
  }

  createBlog(): HTMLLIElement {
    const blog = document.createElement('li');
    blog.classList.add('blog-list__item');
    blog.dataset.id = '${this.id}';
    blog.innerHTML = `
          <picture class="blog-list__cover-wrapper">
            <source
              class="blog-list__cover-webp"
              srcset="${this.cover}.webp"
              type="image/webp"
            />
            <img
              class="blog-list__cover"
              src="${this.cover}.png"
              alt="blog cover"
              loading="lazy"
              decoding="async"
              width="180"
              height="180"
            />
          </picture>
          <div class="blog-list__info">
            <p class="blog-list__title">${this.title}</p>
            <span class="blog-list__date">${this.date}</span>
            <a href="/blog-single?id=${this.id}" class="blog-list__link" aria-label="go to blog page">Read More</a>
          </div>
        `;
    return blog;
  }
}

export const handlers = {
  loadBlogs(list: HTMLUListElement, content: BlogData[]) {
    const blogsPerColumn = 3;

    for (let index = content.length - 1; index >= content.length - blogsPerColumn; index--) {
      const blog = new Blog(content[index]);
      const newBlog = blog.createBlog();
      list.append(newBlog);
    }
  },

  renderList(
    list: HTMLUListElement,
    currentButton: number,
    content: BlogData[],
    paginationLength: number,
  ) {
    list.replaceChildren();

    const blogsPerColumn = 3;
    const buttonIndex = (paginationLength - currentButton) * blogsPerColumn;
    const startBlogNumber = content.length - 1 - buttonIndex;

    for (let index = startBlogNumber; index > startBlogNumber - blogsPerColumn; index--) {
      if (index < 0 || index >= content.length) {
        continue;
      }

      const blog = new Blog(content[index]);
      const newBlog = blog.createBlog();
      list.append(newBlog);
    }
  },

  animateList(list: HTMLUListElement, add: string | undefined, remove: string | undefined) {
    if (!remove) {
      list.classList.add('blog-list--animated');
    }

    if (!add) {
      list.classList.remove('blog-list--animated');
    }
  },
};
