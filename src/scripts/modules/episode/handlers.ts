import type { Episode } from '../_episodes/load-episodes';

export const handlers = {
  loadEpisodeCover(png: HTMLImageElement, webp: HTMLSourceElement, content: Episode) {
    png.src = `${content.cover}.png`;
    webp.srcset = `${content.cover}.webp`;
  },

  loadEpisodeTitle(title: HTMLElement, content: Episode) {
    title.textContent = content.title;
  },

  loadEpisodeInfo(info: HTMLElement, content: Episode) {
    info.textContent = `Episode ${content.id} | ${content.date} | By VitaThemes`;
  },

  loadEpisodeAudio(audio: HTMLAudioElement, content: Episode) {
    audio.src = content.audioSrc;
  },

  loadEpisodeShortDescription(shortDescription: HTMLElement, content: Episode) {
    shortDescription.textContent = content.shortDescription;
  },
  loadEpisodeDescription(shortDescription: HTMLElement, content: Episode) {
    shortDescription.textContent = content.description;
  },
  loadEpisodeTranscriptionText(text: HTMLElement, content: Episode) {
    text.textContent = content.transcription;
  },
  loadEpisodeHashtags(hashtags: NodeListOf<HTMLElement>, content: Episode) {
    for (const [index, hashtag] of hashtags.entries()) {
      hashtag.textContent = content.hashtags[index];
    }
  },
  loadDisplayDurationAudio(display: HTMLElement, audio: HTMLAudioElement) {
    audio.addEventListener('loadedmetadata', () => {
      display.textContent = String(Math.round(audio.duration / 60));
    });
  },
  setTranscriptionVisibility(transcription: HTMLElement, button: HTMLButtonElement) {
    transcription.classList.toggle('episode__transcription-text--visible');
    button.classList.toggle('episode__transcription-info-button--visible');

    if (transcription.getAttribute('aria-hidden') === 'true') {
      transcription.setAttribute('aria-hidden', 'false');
    } else {
      transcription.setAttribute('aria-hidden', 'true');
    }

    if (button.getAttribute('aria-expanded') === 'false') {
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('aria-expanded', 'false');
    }
  },
};
