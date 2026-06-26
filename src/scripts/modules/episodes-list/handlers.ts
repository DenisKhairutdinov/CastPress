import type { Episode as EpisodeData } from '../_episodes/load-episodes';

class Episode {
  id: number;
  date: string;
  category: string;
  title: string;
  shortDescription: string;
  audioSrc: string;

  constructor({ id, date, category, title, shortDescription, audioSrc }: EpisodeData) {
    this.id = id;
    this.date = date;
    this.category = category;
    this.title = title;
    this.shortDescription = shortDescription;
    this.audioSrc = audioSrc;
  }

  createEpisode(): HTMLLIElement {
    const episode = document.createElement('li');
    episode.classList.add('episodes-list__item');
    episode.innerHTML = `
      <p class="episodes-list__info">${this.category} | ${this.date}</p>
      <a href="/CastPress/episode?id=${this.id}" class="episodes-list__title" aria-label="go to episode page">${this.id} - ${this.title}</a>
      <p class="episodes-list__short-description">${this.shortDescription}</p>
    `;
    return episode;
  }
}

export const handlers = {
  loadEpisodes(list: HTMLUListElement, content: EpisodeData[]) {
    const episodesPerColumn = 3;

    for (let index = content.length - 1; index >= content.length - episodesPerColumn; index--) {
      const episode = new Episode(content[index]);
      const newEpisode = episode.createEpisode();

      if (index === content.length - 1 && newEpisode) {
        const infoElement = newEpisode.querySelector<HTMLElement>('.episodes-list__info');

        if (infoElement) {
          infoElement.classList.add('episodes-list__info--new');
        }
      }
      list.append(newEpisode);
    }
  },

  renderList(
    list: HTMLUListElement,
    currentButton: number,
    content: EpisodeData[],
    paginationLength: number,
  ) {
    list.replaceChildren();

    const episodesPerColumn = 3;
    const buttonIndex = (paginationLength - currentButton) * episodesPerColumn;
    const startEpisodeNumber = content.length - 1 - buttonIndex;

    for (let index = startEpisodeNumber; index > startEpisodeNumber - episodesPerColumn; index--) {
      if (index < 0 || index >= content.length) {
        continue;
      }

      const episode = new Episode(content[index]);
      const newEpisode = episode.createEpisode();

      if (index === content.length - 1) {
        newEpisode
          .querySelector<HTMLElement>('.episodes-list__info')
          ?.classList.add('episodes-list__info--new');
      }

      list.append(newEpisode);
    }
  },

  animateList(list: HTMLUListElement, add: string | undefined, remove: string | undefined) {
    if (!remove) {
      list.classList.add('episodes-list--animated');
    }

    if (!add) {
      list.classList.remove('episodes-list--animated');
    }
  },
};
