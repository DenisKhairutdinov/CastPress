export const dom = {
  menuButton: document.querySelector<HTMLButtonElement>('[data-menu-button]'),
  menu: document.querySelector<HTMLElement>('[data-menu]'),
  menuList: document.querySelector<HTMLElement>('[data-menu-list]'),
  submenuButtons: document.querySelectorAll<HTMLButtonElement>('[data-submenu-button]'),
  sublists: document.querySelectorAll<HTMLElement>('[data-menu-sublist]'),
};
