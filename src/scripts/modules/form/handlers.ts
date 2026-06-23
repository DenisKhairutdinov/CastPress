export const handlers = {
  trackInputError(input: HTMLInputElement, error: HTMLElement) {
    input.classList.add('form__input--error');
    input.ariaInvalid = 'true';
    error.style.display = 'block';
  },

  removeInputError(input: HTMLInputElement, error: HTMLElement) {
    input.classList.remove('form__input--error');
    input.ariaInvalid = 'false';
    error.style.display = 'none';
  },

  addInputErrorAnimation(error: HTMLElement) {
    error.classList.add('form__error--animated');
  },

  removeInputErrorAnimation(error: HTMLElement) {
    error.classList.remove('form__error--animated');
  },

  showMessage(message: HTMLElement, form: HTMLFormElement) {
    message.style.display = 'flex';
    message.classList.remove('form__message--hidden');
    form.reset();

    setTimeout(() => {
      message.classList.add('form__message--hidden');
      setTimeout(() => {
        message.style.display = 'none';
      }, 200);
    }, 1500);
  },
};
