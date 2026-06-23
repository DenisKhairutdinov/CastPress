import { dom } from './dom';
import { handlers } from './handlers';

function initIndex() {
  const { themeButtonsWrapper, themeButtons } = dom;

  if (!themeButtonsWrapper || !themeButtons) {
    return;
  }

  themeButtonsWrapper.addEventListener('click', () => {
    handlers.setTheme(themeButtonsWrapper, themeButtons);
    handlers.saveUserTheme();
  });
}
initIndex();
