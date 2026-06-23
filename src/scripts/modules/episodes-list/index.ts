import { dom } from './dom';
import { handlers } from './handlers';
import { allEpisodes } from '../_episodes/load-episodes';
import { subscribeToNumberOfCurrentButton } from '../pagination/index';

export function initEpisodesList() {
  const { episodesList } = dom;

  if (!episodesList) {
    return;
  }

  let currentButton: number;

  handlers.loadEpisodes(episodesList, allEpisodes);

  subscribeToNumberOfCurrentButton((newValue: number) => {
    currentButton = newValue;
    handlers.animateList(episodesList, 'add', undefined);
    episodesList.addEventListener('animationend', () => {
      handlers.animateList(episodesList, undefined, 'remove');
    });
    setTimeout(() => {
      handlers.renderList(episodesList, currentButton, allEpisodes, 8);
    }, 200);
  });
}
// eslint-disable-next-line unicorn/no-top-level-side-effects
initEpisodesList();
