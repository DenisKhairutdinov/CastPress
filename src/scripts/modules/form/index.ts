import { dom } from './dom';
import { handlers } from './handlers';

function initForms() {
  const { allForm, formMessage } = dom;

  if (!allForm || !formMessage) {
    return;
  }

  for (const form of allForm) {
    const currentInputs = form.querySelectorAll<HTMLInputElement>('[required]');
    const currentEmptyErrors = form.querySelectorAll<HTMLElement>('.form__error--empty');
    const currentInvalidError = form.querySelector<HTMLElement>('.form__error--invalid');
    const currentMessage = form.querySelector<HTMLElement>('.form__message');

    form.addEventListener(
      'invalid',
      (event) => {
        event.preventDefault();

        const input = event.target;
        if (input instanceof HTMLInputElement) {
          const validity = input.validity;
          const index = [...currentInputs].indexOf(input);

          if (currentInvalidError) {
            handlers.removeInputError(input, currentInvalidError);
          }

          if (validity.valueMissing) {
            handlers.trackInputError(input, currentEmptyErrors[index]);

            handlers.addInputErrorAnimation(currentEmptyErrors[index]);
            currentEmptyErrors[index].addEventListener('animationend', () => {
              handlers.removeInputErrorAnimation(currentEmptyErrors[index]);
            });
          } else if ((validity.typeMismatch || validity.patternMismatch) && currentInvalidError) {
            handlers.trackInputError(input, currentInvalidError);

            handlers.addInputErrorAnimation(currentInvalidError);
            currentInvalidError.addEventListener('animationend', () => {
              handlers.removeInputErrorAnimation(currentInvalidError);
            });
          }
        }
      },
      { capture: true },
    );

    for (const [index, input] of currentInputs.entries()) {
      input.addEventListener('input', () => {
        if (!input.value) {
          return;
        }

        handlers.removeInputError(input, currentEmptyErrors[index]);

        if (currentInvalidError) {
          handlers.removeInputError(input, currentInvalidError);
        }
      });
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      await fetch('api/send', { method: 'POST', body: formData });

      if (currentMessage) {
        handlers.showMessage(currentMessage, form);
      } else {
        form.reset();
      }
    });
  }
}
initForms();
