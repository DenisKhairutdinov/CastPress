import type { Episode } from '../_episodes/load-episodes';

export const handlers = {
  openMainMenu(menuButton: HTMLButtonElement, menu: HTMLElement, menuList: HTMLElement) {
    menuButton.classList.add(`${menuButton.classList[0]}--open`);
    menu?.classList.add(`${menu.classList[0]}--open`);

    menuButton.ariaExpanded = 'true';
    menuList.ariaHidden = 'false';
  },

  setOpenedState(menuList: HTMLElement) {
    menuList.ariaHidden = 'false';
  },

  setClosedState(menuList: HTMLElement) {
    menuList.ariaHidden = 'true';
  },

  closeMainMenu(menuButton: HTMLButtonElement, menu: HTMLElement, menuList: HTMLElement) {
    menuButton.classList.remove(`${menuButton.classList[0]}--open`);
    menu.classList.remove(`${menu.classList[0]}--open`);

    menuButton.ariaExpanded = 'true';
    menuList.ariaHidden = 'true';
  },

  openSubMenu(menuButton: HTMLButtonElement, menu: HTMLElement) {
    menuButton.classList.add(`${menuButton.classList[0]}--open`);
    menu.classList.add(`${menu.classList[0]}--open`);

    menuButton.ariaExpanded = 'true';
    menu.ariaHidden = 'false';
  },

  closeSubMenu(menuButton: HTMLButtonElement, menu: HTMLElement) {
    menuButton.classList.remove(`${menuButton.classList[0]}--open`);
    menu.classList.remove(`${menu.classList[0]}--open`);

    menuButton.ariaExpanded = 'false';
    menu.ariaHidden = 'true';
  },

  closeAllSubmenus(
    submenuButtons: NodeListOf<HTMLButtonElement>,
    submenus: NodeListOf<HTMLElement>,
    startIndex: number,
  ) {
    for (const [index, element] of submenuButtons.entries()) {
      if (index >= startIndex) {
        handlers.closeSubMenu(element, submenus[index]);
      }
    }
  },

  setActiveStateOfMenuElement(
    menuLinks: NodeListOf<HTMLElement>,
    subLinks: NodeListOf<HTMLElement>,
    url: string,
    id: number,
  ) {
    for (const link of menuLinks) {
      if (link.textContent.trim() === url) {
        link.classList.add('menu__link--opened');
      }
    }

    if (id >= 0 && id < subLinks.length) {
      subLinks[id].style.color = 'var(--accent)';
    }
  },

  loadEpisodesSublist(sublists: NodeListOf<HTMLElement>, content: Episode[]) {
    const episode = content.at(-1);
    if (!episode) {
      return;
    }

    const seasonsQuantity = episode.season;

    for (let index = 1; index <= seasonsQuantity; index++) {
      const season = document.createElement('li');
      season.classList.add('menu__subitem', 'menu__subitem--has-submenu');

      season.innerHTML = `
        <button 
          class="menu__toggle" 
          type="button" 
          aria-label="open season ${index} submenu" 
          aria-haspopup="true" 
          aria-expanded="false" 
          aria-controls = "submenu-1-${index}"
          data-submenu-button
        >Season ${index} </button>
        <ul 
          id="submenu-1-${index}" 
          class="menu__sublist" 
          aria-hidden="true"
          data-menu-sublist
        ></ul>
      `;
      sublists[0].append(season);
    }
  },

  loadSeasonsSublists(sublists: NodeListOf<HTMLElement>, content: Episode[]) {
    for (const element of content) {
      const seasonsItem = document.createElement('li');
      seasonsItem.classList.add('menu__subitem');
      seasonsItem.dataset.id = String(element.id);

      seasonsItem.innerHTML = `
        <a 
          href="/CastPress/episode?id=${element.id}" 
          class="menu__sublink"
          data-menu-sublink
        >${element.title}</a>
      `;
      sublists[element.season].append(seasonsItem);
    }
  },
};
