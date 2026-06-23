import { dom } from './dom';
import { handlers } from './handlers';
import { allEpisodes } from '../_episodes/load-episodes';
import { allBlogs } from '../_blog/load-blog';

export let numberOfCurrentButton = 0;
let callback: ((value: number) => void) | undefined;
export const subscribeToNumberOfCurrentButton = (function_: (value: number) => void) => {
  // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
  callback = function_;
};

function initPagination() {
  const { pagination, paginationRightArrow, paginationLeftArrow, episodesList, blogList } = dom;

  let { paginationWrapper, paginationCentralButtons } = dom;

  if (
    !pagination ||
    !paginationWrapper ||
    !paginationCentralButtons ||
    !paginationRightArrow ||
    !paginationLeftArrow
  ) {
    return;
  }

  if (episodesList) {
    handlers.loadPaginationButtons(paginationWrapper, paginationCentralButtons, allEpisodes);
  } else if (blogList) {
    handlers.loadPaginationButtons(paginationWrapper, paginationCentralButtons, allBlogs);
  }

  //refresh containers
  paginationWrapper = document.querySelector<HTMLElement>('[data-pagination-wrapper]');
  paginationCentralButtons = document.querySelector<HTMLElement>('[data-central-buttons]');
  const quantityOfVisibleButtons = 5;
  if (paginationWrapper && paginationCentralButtons) {
    const buttons = paginationWrapper.querySelectorAll<HTMLButtonElement>('button');
    // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
    numberOfCurrentButton = buttons.length;

    handlers.setWidthOfCentralButtonsContainer(
      buttons[0],
      paginationCentralButtons,
      quantityOfVisibleButtons,
    );
    handlers.renderPagination(
      paginationCentralButtons,
      quantityOfVisibleButtons,
      numberOfCurrentButton,
    );

    paginationWrapper.addEventListener('click', (event) => {
      const currentButton = (event.target as HTMLButtonElement).closest<HTMLButtonElement>(
        'button',
      );

      if (currentButton) {
        // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
        numberOfCurrentButton = Number(currentButton.dataset.number);

        handlers.resetButtons(paginationWrapper);
        handlers.setActiveButton(currentButton);
        handlers.setArrowState(
          numberOfCurrentButton,
          paginationLeftArrow,
          paginationRightArrow,
          paginationWrapper,
        );
        handlers.renderPagination(
          paginationCentralButtons,
          quantityOfVisibleButtons,
          numberOfCurrentButton,
        );
      }

      if (callback) {
        callback(numberOfCurrentButton);
      }
    });

    paginationLeftArrow.addEventListener('click', () => {
      if (numberOfCurrentButton < buttons.length) {
        // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
        numberOfCurrentButton++;
        handlers.resetButtons(paginationWrapper);
        handlers.setActiveButton(buttons[buttons.length - numberOfCurrentButton]);
        handlers.setArrowState(
          numberOfCurrentButton,
          paginationLeftArrow,
          paginationRightArrow,
          paginationWrapper,
        );
        handlers.renderPagination(
          paginationCentralButtons,
          quantityOfVisibleButtons,
          numberOfCurrentButton,
        );
      }

      if (callback) {
        callback(numberOfCurrentButton);
      }
    });

    paginationRightArrow.addEventListener('click', () => {
      if (numberOfCurrentButton > 1) {
        // eslint-disable-next-line unicorn/no-top-level-assignment-in-function
        numberOfCurrentButton--;
        handlers.resetButtons(paginationWrapper);
        handlers.setActiveButton(buttons[buttons.length - numberOfCurrentButton]);
        handlers.setArrowState(
          numberOfCurrentButton,
          paginationLeftArrow,
          paginationRightArrow,
          paginationWrapper,
        );
        handlers.renderPagination(
          paginationCentralButtons,
          quantityOfVisibleButtons,
          numberOfCurrentButton,
        );
      }

      if (callback) {
        callback(numberOfCurrentButton);
      }
    });
  }
}
// eslint-disable-next-line unicorn/no-top-level-side-effects
initPagination();
