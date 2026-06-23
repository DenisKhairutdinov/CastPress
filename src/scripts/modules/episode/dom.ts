export const dom = {
  episodeHeaderTitle: document.querySelector<HTMLElement>('[data-episode-header-title]'),
  episodeInfo: document.querySelector<HTMLElement>('[data-episode-info]'),
  episodeAudio: document.querySelector<HTMLAudioElement>('[data-episode-audio]'),
  episodeStreaming: document.querySelector<HTMLUListElement>('[data-episode-streamings]'),
  episodeCoverWebp: document.querySelector<HTMLSourceElement>('[data-episode-cover-webp]'),
  episodeCover: document.querySelector<HTMLImageElement>('[data-episode-cover]'),

  episodeShortDescription: document.querySelector<HTMLElement>('[data-episode-short-description]'),
  episodeTitle: document.querySelector<HTMLElement>('[data-episode-title]'),
  episodeDescription: document.querySelector<HTMLElement>('[data-episode-description]'),
  episodeTranscriptionText: document.querySelector<HTMLElement>('[data-episode-transcription]'),
  episodeHashtags: document.querySelectorAll<HTMLElement>('[data-episode-hashtag]'),
  episodeTranscriptionInfoDuration: document.querySelector<HTMLElement>('[data-episode-duration]'),
  episodeTranscriptionButton: document.querySelector<HTMLButtonElement>(
    '[data-episode-transcription-button]',
  ),
};
