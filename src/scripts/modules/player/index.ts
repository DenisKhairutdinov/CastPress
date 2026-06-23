import { dom } from './dom';
import { handlers } from './handlers';

function initIndex() {
  const {
    player,
    audio,
    playPauseButton,
    playPauseIcon,
    muteButton,
    muteIcon,
    currentTime,
    duration,
    progressBar,
  } = dom;

  if (
    !player ||
    !audio ||
    !playPauseButton ||
    !playPauseIcon ||
    !muteButton ||
    !muteIcon ||
    !currentTime ||
    !duration ||
    !progressBar
  ) {
    return;
  }

  let isPlay = false;
  let isMuted = false;

  handlers.setAudioDuration(audio, duration, progressBar);
  handlers.setAudioCurrentTime(audio, currentTime);
  handlers.setAudioProgress(audio, progressBar);

  playPauseButton.addEventListener('click', () => {
    if (!isPlay) {
      isPlay = true;
      handlers.startPlayer(audio, playPauseButton);
    } else if (isPlay) {
      isPlay = false;
      handlers.pausePlayer(audio, playPauseButton);
    }
  });

  audio.addEventListener('timeupdate', () => {
    handlers.changeAudioProgressBar(audio, progressBar);
  });

  muteButton.addEventListener('click', () => {
    if (!isMuted) {
      isMuted = true;
      handlers.muteAudio(audio, muteButton);
    } else if (isMuted) {
      isMuted = false;
      handlers.unmuteAudio(audio, muteButton);
    }
  });

  audio.addEventListener('ended', () => {
    isPlay = false;
    handlers.pausePlayer(audio, playPauseButton);
  });
}
initIndex();
