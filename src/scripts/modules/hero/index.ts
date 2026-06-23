import { dom } from './dom';
import { handlers } from './handlers';
import { allEpisodes } from '../_episodes/load-episodes';

function initHero() {
  const {
    heroEpisodeLink,
    heroEpisodeTitle,
    heroEpisodeCoverWebp,
    heroEpisodeCover,
    heroEpisodeInfo,
    heroEpisodeAudio,
    heroEpisodeStreaming,
  } = dom;

  if (
    !heroEpisodeLink ||
    !heroEpisodeTitle ||
    !heroEpisodeCoverWebp ||
    !heroEpisodeCover ||
    !heroEpisodeInfo ||
    !heroEpisodeAudio ||
    heroEpisodeStreaming.length === 0
  ) {
    return;
  }

  const latestEpisode = allEpisodes.at(-1);
  if (!latestEpisode) {
    return;
  }

  handlers.setLatestEpisodeLink(heroEpisodeLink, latestEpisode);
  handlers.setLatestEpisodeTitle(heroEpisodeTitle, latestEpisode);
  handlers.setLatestEpisodeCover(heroEpisodeCover, heroEpisodeCoverWebp, latestEpisode);
  handlers.setLatestEpisodeInfo(heroEpisodeInfo, latestEpisode);
  handlers.setLatestEpisodeAudio(heroEpisodeAudio, latestEpisode);
  handlers.setStreamingLinks(heroEpisodeStreaming, latestEpisode);
}
initHero();
