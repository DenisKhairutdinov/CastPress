import type { Episode } from '../_episodes/load-episodes';
import type { Blog } from '../_blog/load-blog';

export const handlers = {
  loadPaginationButtons(
    container: HTMLElement,
    subcontainer: HTMLElement,
    content: Episode[] | Blog[],
  ) {
    const episodesPerColumn = 3;
    const columnsQuantity = Math.ceil(content.length / episodesPerColumn);
    // const columnsQuantity = 15;

    //generate buttons
    for (let index = 1; index <= columnsQuantity; index++) {
      const button = document.createElement('button');
      button.className = 'pagination__button';
      button.type = 'button';
      button.textContent = String(index);
      button.dataset.number = String(index);
      button.dataset.centralButton = '';

      //set active class for last button
      if (index === columnsQuantity) {
        button.classList.add('pagination__button--active');
        button.ariaCurrent = 'true';
      }

      //add button to container / subcontainer
      if (index === 1) {
        container.append(button);
      } else if (index === columnsQuantity) {
        container.prepend(button);
      } else {
        subcontainer.prepend(button);
      }
    }
  },

  //----------------------------------------------------------------------

  resetButtons(container: HTMLElement) {
    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    if (buttons.length === 0) {
      return;
    }
    for (const button of buttons) {
      button.classList.remove('pagination__button--active', 'pagination__button--disable');
      button.removeAttribute('aria-current');
      button.textContent = button.dataset.number ?? '';
    }
  },

  setActiveButton(button: HTMLButtonElement) {
    button.classList.add('pagination__button--active');
    button.ariaCurrent = 'true';
  },

  setArrowState(
    numberOfButton: number,
    leftArrow: HTMLButtonElement,
    rightArrow: HTMLButtonElement,
    container: HTMLElement,
  ) {
    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    switch (numberOfButton) {
      case buttons.length: {
        leftArrow.classList.add('pagination__arrow--unactive');
        rightArrow.classList.remove('pagination__arrow--unactive');
        break;
      }
      case 1: {
        leftArrow.classList.remove('pagination__arrow--unactive');
        rightArrow.classList.add('pagination__arrow--unactive');
        break;
      }
      default: {
        leftArrow.classList.remove('pagination__arrow--unactive');
        rightArrow.classList.remove('pagination__arrow--unactive');
      }
    }
  },

  setWidthOfCentralButtonsContainer(
    button: HTMLButtonElement,
    subcontainer: HTMLElement,
    quantityOfVisibleButtons: number,
  ) {
    const buttonWidth = button.offsetWidth;
    const spaceBetweenButtons = Number.parseFloat(getComputedStyle(subcontainer).columnGap);
    const containerWidth = quantityOfVisibleButtons * (buttonWidth + spaceBetweenButtons);

    subcontainer.style.maxInlineSize = `${containerWidth}px`;
  },

  renderPagination(
    subcontainer: HTMLElement,
    quantityOfVisibleButtons: number,
    currentButton: number,
  ) {
    const centralButtons = subcontainer.querySelectorAll('button');
    const buttonWidth = centralButtons[0].offsetWidth;
    const spaceBetweenButtons = Number.parseFloat(getComputedStyle(subcontainer).columnGap);
    const transformStep = buttonWidth + spaceBetweenButtons;

    if (currentButton >= centralButtons.length - 1) {
      centralButtons[quantityOfVisibleButtons - 1].textContent = '···';
      centralButtons[quantityOfVisibleButtons - 1].classList.add('pagination__button--disable');
      subcontainer.style.justifyContent = 'start';
      for (const button of centralButtons) {
        button.style.transform = 'translateX(0)';
      }
    } else if (currentButton < quantityOfVisibleButtons) {
      centralButtons[centralButtons.length - quantityOfVisibleButtons].textContent = '···';
      centralButtons[centralButtons.length - quantityOfVisibleButtons].classList.add(
        'pagination__button--disable',
      );
      for (const button of centralButtons) {
        button.style.transform = 'translateX(0)';
      }
      subcontainer.style.justifyContent = 'end';
    } else {
      centralButtons[centralButtons.length - currentButton + 3].textContent = '···';
      centralButtons[centralButtons.length - currentButton + 3].classList.add(
        'pagination__button--disable',
      );

      centralButtons[centralButtons.length - currentButton - 1].textContent = '···';
      centralButtons[centralButtons.length - currentButton - 1].classList.add(
        'pagination__button--disable',
      );
      for (const button of centralButtons) {
        button.style.transform = `translateX(-${transformStep * (centralButtons.length - currentButton - 1)}px)`;
      }
      subcontainer.style.justifyContent = 'start';
    }
  },
};
