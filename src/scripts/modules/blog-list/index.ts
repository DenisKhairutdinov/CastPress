import { dom } from './dom';
import { handlers } from './handlers';
import { allBlogs } from '../_blog/load-blog';
import { subscribeToNumberOfCurrentButton } from '../pagination/index';

export function initIndex() {
  const { blogList } = dom;

  if (!blogList) {
    return;
  }

  let currentButton: number;

  handlers.loadBlogs(blogList, allBlogs);

  subscribeToNumberOfCurrentButton((newValue) => {
    currentButton = newValue;
    handlers.animateList(blogList, 'add', undefined);
    blogList.addEventListener('animationend', () => {
      handlers.animateList(blogList, undefined, 'remove');
    });
    setTimeout(() => {
      handlers.renderList(blogList, currentButton, allBlogs, 10);
    }, 200);
  });
}
// eslint-disable-next-line unicorn/no-top-level-side-effects
initIndex();
