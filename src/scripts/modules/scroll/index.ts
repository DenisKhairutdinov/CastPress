import { dom } from './dom';
import { handlers } from './handlers';

function initScroll() {
  const { sections } = dom;

  if (sections.length <= 1) {
    return;
  }
  handlers.observe(dom.sections);
  window.scrollTo(0, 0);
}
initScroll();
