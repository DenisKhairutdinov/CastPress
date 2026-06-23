import type { Blog } from '../_blog/load-blog';

export const handlers = {
  loadBlogCover(png: HTMLImageElement, webp: HTMLSourceElement, content: Blog) {
    png.src = `${content.cover}.png`;
    webp.srcset = `${content.cover}.webp`;
  },

  loadBlogTitle(title: HTMLElement, content: Blog) {
    title.textContent = content.title;
  },

  loadBlogInfo(info: HTMLElement, content: Blog) {
    info.textContent = `Blog ${content.id} | ${content.date} | By VitaThemes`;
  },

  loadBlogShortDescription(shortDescription: HTMLElement, content: Blog) {
    shortDescription.textContent = content.shortDescription;
  },

  loadBlogDescription(shortDescription: HTMLElement, content: Blog) {
    shortDescription.textContent = content.description;
  },

  loadBlogHashtags(hashtags: NodeListOf<HTMLElement>, content: Blog) {
    for (const [index, hashtag] of hashtags.entries()) {
      hashtag.textContent = content.hashtags[index];
    }
  },
};
