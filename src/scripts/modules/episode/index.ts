import { dom } from './dom';
import { handlers } from './handlers';
import { allEpisodes } from '../_episodes/load-episodes';

function initEpisode() {
  const {
    episodeHeaderTitle,
    episodeInfo,
    episodeAudio,
    episodeStreaming,
    episodeCoverWebp,
    episodeCover,
  } = dom;

  const {
    episodeShortDescription,
    episodeTitle,
    episodeDescription,
    episodeTranscriptionText,
    episodeHashtags,
    episodeTranscriptionInfoDuration,
    episodeTranscriptionButton,
  } = dom;

  if (
    !episodeHeaderTitle ||
    !episodeInfo ||
    !episodeAudio ||
    !episodeStreaming ||
    !episodeCoverWebp ||
    !episodeCover
  ) {
    return;
  }

  if (
    !episodeShortDescription ||
    !episodeTitle ||
    !episodeDescription ||
    !episodeTranscriptionText ||
    !episodeHashtags ||
    !episodeTranscriptionInfoDuration ||
    !episodeTranscriptionButton
  ) {
    return;
  }

  const id = Number(new URLSearchParams(location.search).get('id')) - 1;

  if (id >= 0 && id < allEpisodes.length) {
    handlers.loadEpisodeCover(episodeCover, episodeCoverWebp, allEpisodes[id]);
    handlers.loadEpisodeTitle(episodeHeaderTitle, allEpisodes[id]);
    handlers.loadEpisodeInfo(episodeInfo, allEpisodes[id]);
    handlers.loadEpisodeAudio(episodeAudio, allEpisodes[id]);

    handlers.loadEpisodeShortDescription(episodeShortDescription, allEpisodes[id]);
    handlers.loadEpisodeTitle(episodeTitle, allEpisodes[id]);
    handlers.loadEpisodeDescription(episodeDescription, allEpisodes[id]);
    handlers.loadEpisodeTranscriptionText(episodeTranscriptionText, allEpisodes[id]);
    handlers.loadEpisodeHashtags(episodeHashtags, allEpisodes[id]);
    handlers.loadDisplayDurationAudio(episodeTranscriptionInfoDuration, episodeAudio);

    episodeTranscriptionButton.addEventListener('click', () => {
      handlers.setTranscriptionVisibility(episodeTranscriptionText, episodeTranscriptionButton);
    });
  }
}
initEpisode();
