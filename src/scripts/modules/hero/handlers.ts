import type { Episode } from '../_episodes/load-episodes';

export const handlers = {
  setLatestEpisodeLink(link: HTMLLinkElement, content: Episode) {
    link.href = `/episode?id=${content.id}`;
  },

  setLatestEpisodeTitle(title: HTMLElement, content: Episode) {
    title.textContent = content.title;
  },

  setLatestEpisodeCover(png: HTMLImageElement, webp: HTMLSourceElement, content: Episode) {
    png.src = `${content.cover}.png`;
    webp.srcset = `${content.cover}.webp`;
  },

  setLatestEpisodeInfo(info: HTMLElement, content: Episode) {
    info.textContent = `Episode ${content.id} | ${content.date} | By VitaThemes`;
  },

  setLatestEpisodeAudio(audio: HTMLAudioElement, content: Episode) {
    audio.src = content.audioSrc;
  },

  setStreamingLinks(links: NodeListOf<HTMLLinkElement>, content: Episode) {
    const streamingUrls = Object.values(content.streaming);
    for (const [index, link] of [...links].entries()) {
      if (link.dataset.name === Object.keys(content.streaming)[index]) {
        link.href = streamingUrls[index];
      }
    }
  },
};
