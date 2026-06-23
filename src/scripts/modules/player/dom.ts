export const dom = {
  player: document.querySelector<HTMLElement>('[data-player]'),
  audio: document.querySelector<HTMLAudioElement>('[data-player-audio]'),

  playPauseButton: document.querySelector<HTMLButtonElement>('[data-play-pause-button]'),
  playPauseIcon: document.querySelector<HTMLElement>('[data-play-pause-icon]'),

  muteButton: document.querySelector<HTMLButtonElement>('[data-mute-button]'),
  muteIcon: document.querySelector<HTMLElement>('[data-mute-icon]'),

  currentTime: document.querySelector<HTMLElement>('[data-current-time]'),
  duration: document.querySelector<HTMLElement>('[data-duration]'),

  progressBar: document.querySelector<HTMLInputElement>('[data-progress]'),
};
