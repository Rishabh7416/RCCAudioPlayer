import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player';

export const trackPlayerSetup = async songLists => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songLists);
    await TrackPlayer.updateOptions({
      stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
  } catch (error) {
    console.log('check your trackPlayerSetup function');
  }
};

export const playBackStateToggling = async () => {
  try {
    const trackState = await TrackPlayer.getState();
    if (trackState != State.Playing) TrackPlayer.play();
    if (trackState == State.Buffering) alert('buffering');
    else TrackPlayer.pause();
  } catch (error) {
    console.log('check your playBackStateToggling function');
  }
};

export const seekToTrack = async value => {
  try {
    await TrackPlayer.seekTo(value);
  } catch (error) {
    alert('check your seekToTrack function');
  }
};

export const skipToNextPreviousTrack = async trackIndex => {
  try {
    await TrackPlayer.skip(trackIndex);
  } catch (error) {
    alert('check your skipToNextPreviousTrack function');
  }
};

export const formatTime = (trackTime, conditionalValues) => {
  var timeInMin = Math.floor(trackTime / 59);
  var timeInSec =
    timeInMin >= 1
      ? Math.round(trackTime) - timeInMin * 60
      : Math.round(trackTime);
      if (timeInMin == -1) {timeInMin = 0}
      if (timeInSec == -1) {timeInSec = 0}
  var result =
    timeInSec % 60 === 0
      ? `0${timeInMin} : 00`
      : timeInSec > 9
      ? `0${timeInMin} : ${timeInSec}`
      : `0${timeInMin} : 0${timeInSec}`;
  return result;
};

export const errorHandling = () => {};
