import { dom } from './dom';
import { handlers } from './handlers';
import { allEpisodes } from '../_episodes/load-episodes';

function initMenu() {
  const { menuButton, menu, menuList } = dom;

  let { submenuButtons, sublists } = dom;

  if (!menuButton || !menu || !menuList || !submenuButtons || !sublists) {
    return;
  }

  const id = Number(new URLSearchParams(location.search).get('id')) - 1;
  const url = location.pathname.split('/').pop();

  handlers.loadEpisodesSublist(sublists, allEpisodes);

  //refresh sublists and buttons
  sublists = document.querySelectorAll<HTMLElement>('[data-menu-sublist]');
  submenuButtons = document.querySelectorAll<HTMLButtonElement>('[data-submenu-button]');

  handlers.loadSeasonsSublists(sublists, allEpisodes);

  const links = document.querySelectorAll<HTMLElement>('[data-menu-link]');
  const sublinks = document.querySelectorAll<HTMLElement>('[data-menu-sublink]');

  if (url !== undefined) {
    handlers.setActiveStateOfMenuElement(links, sublinks, url, id);
  }

  //set opened state of menu for desktop
  if (window.innerWidth >= 768) {
    handlers.setOpenedState(menuList);
  }

  let timeout: ReturnType<typeof setTimeout> | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (window.innerWidth >= 768) {
        handlers.setOpenedState(menuList);
      } else {
        handlers.closeMainMenu(menuButton, menu, menuList);
      }
    }, 300);
  });

  menuButton.addEventListener('click', () => {
    if (menuList.getAttribute('aria-hidden') === 'true') {
      handlers.openMainMenu(menuButton, menu, menuList);
      document.body.classList.add('lock');
    } else {
      handlers.closeAllSubmenus(submenuButtons, sublists, 0);
      handlers.closeMainMenu(menuButton, menu, menuList);
      document.body.classList.remove('lock');
    }
  });

  menu.addEventListener('click', (event) => {
    const submenuButton = (event.target as HTMLButtonElement).closest<HTMLButtonElement>(
      '[data-submenu-button]',
    );
    if (!submenuButton) {
      return;
    }

    const buttonIndex = [...submenuButtons].indexOf(submenuButton);

    if (window.innerWidth >= 768) {
      handlers.closeAllSubmenus(submenuButtons, sublists, 1);
    }

    if (sublists[buttonIndex].getAttribute('aria-hidden') === 'false') {
      handlers.closeSubMenu(submenuButton, sublists[buttonIndex]);
      if (buttonIndex === 0) {
        handlers.closeAllSubmenus(submenuButtons, sublists, 0);
      }
      return;
    }
    handlers.openSubMenu(submenuButton, sublists[buttonIndex]);
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (!(!menu.contains(target) && !menuButton.contains(target))) {
      return;
    }

    handlers.closeMainMenu(menuButton, menu, menuList);
    handlers.closeAllSubmenus(submenuButtons, sublists, 0);
  });
}
initMenu();
