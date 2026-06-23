export const handlers = {
  setTheme(buttonsWrapper: HTMLElement, buttons: NodeListOf<HTMLButtonElement>) {
    const isDark = Object.hasOwn(document.documentElement.dataset, 'darkTheme');
    if (isDark) {
      delete document.documentElement.dataset.darkTheme;
    } else {
      document.documentElement.dataset.darkTheme = '';
    }

    buttonsWrapper.classList.toggle('header__theme-buttons-wrapper--dark-theme');

    for (const button of buttons) {
      button.toggleAttribute('hidden');
    }
  },

  saveUserTheme() {
    if (Object.hasOwn(document.documentElement.dataset, 'darkTheme')) {
      localStorage.setItem('dark-theme', 'enabled');
    } else {
      localStorage.setItem('dark-theme', 'disabled');
    }
  },
};
