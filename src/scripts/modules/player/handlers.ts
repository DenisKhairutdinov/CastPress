export const handlers = {
  startPlayer(audio: HTMLAudioElement, button: HTMLButtonElement) {
    audio.play();
    const icons = button.querySelectorAll('use');
    for (const icon of icons) {
      icon.toggleAttribute('hidden');
    }
  },

  pausePlayer(audio: HTMLAudioElement, button: HTMLButtonElement) {
    audio.pause();
    const icons = button.querySelectorAll('use');
    for (const icon of icons) {
      icon.toggleAttribute('hidden');
    }
  },

  setAudioDuration(
    audio: HTMLAudioElement,
    durationDisplay: HTMLElement,
    progressBar: HTMLInputElement,
  ) {
    audio.addEventListener('loadedmetadata', () => {
      durationDisplay.textContent = handlers.formatDuration(audio.duration);
      progressBar.max = String(audio.duration);
    });
  },

  setAudioCurrentTime(audio: HTMLAudioElement, currentTimeDisplay: HTMLElement) {
    audio.addEventListener('timeupdate', () => {
      currentTimeDisplay.textContent = handlers.formatDuration(audio.currentTime);
    });
  },

  formatDuration(seconds: number) {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

    return `${h}:${m}:${s}`;
  },

  muteAudio(audio: HTMLAudioElement, button: HTMLButtonElement) {
    audio.muted = true;
    const icons = button.querySelectorAll('use');
    for (const icon of icons) {
      icon.toggleAttribute('hidden');
    }
  },
  unmuteAudio(audio: HTMLAudioElement, button: HTMLButtonElement) {
    audio.muted = false;
    const icons = button.querySelectorAll('use');
    for (const icon of icons) {
      icon.toggleAttribute('hidden');
    }
  },

  changeAudioProgressBar(audio: HTMLAudioElement, progressBar: HTMLInputElement) {
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.background = `linear-gradient(to right, var(--primary-text) ${progress}%, var(--control-background) ${progress}%)`;
    });
  },

  setAudioProgress(audio: HTMLAudioElement, progressBar: HTMLInputElement) {
    progressBar.addEventListener('input', () => {
      audio.currentTime = Number(progressBar.value);
    });
  },
};
