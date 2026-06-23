export const dom = {
  heroEpisodeLink: document.querySelector<HTMLLinkElement>('[data-hero-link]'),
  heroEpisodeTitle: document.querySelector<HTMLElement>('[data-hero-title]'),
  heroEpisodeCoverWebp: document.querySelector<HTMLSourceElement>('[data-hero-image-webp]'),
  heroEpisodeCover: document.querySelector<HTMLImageElement>('[data-hero-image]'),
  heroEpisodeInfo: document.querySelector<HTMLElement>('[data-hero-info]'),
  heroEpisodeAudio: document.querySelector<HTMLAudioElement>('[data-hero-player]'),
  heroEpisodeStreaming: document.querySelectorAll<HTMLLinkElement>('[data-hero-streaming-link]'),
};
