import TrackPlayer, {State, useProgress} from 'react-native-track-player';

export const trackPlayerSetup = async songLists => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songLists);
  } catch (error) {
    console.log('error', error);
  }
};

export const trackInfo = async infoCallBack => {
  try {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    infoCallBack(trackObject);
  } catch (error) {
    console.log('not able to set index');
  }
};

export const playBackStateToggling = async () => {
  try {
    const trackState = await TrackPlayer.getState();
    if (trackState != State.Playing) {
      console.log('play', trackState);
      TrackPlayer.play();
    } else {
      console.log('paused', trackState);
      TrackPlayer.pause();
    }
  } catch (error) {
    console.log('song is not playing');
  }
};

export const seekToTrack = async value => {
  try {
    await TrackPlayer.seekTo(value);
  } catch (error) {
    alert('error');
  }
};

export const formatTime = (trackTime, conditionalValues) => {
  var timeInMin = Math.floor(trackTime / 59);
  var timeInSec =
    timeInMin >= 1
      ? Math.round(trackTime) - timeInMin * 60
      : Math.round(trackTime);
  var result =
    timeInSec % 60 === 0
      ? `0${timeInMin} : 00`
      : timeInSec > 9
      ? `0${timeInMin} : ${timeInSec}`
      : `0${timeInMin} : 0${timeInSec}`;
  return result;
};

export const skipToNextPreviousTrack = async trackIndex => {
  await TrackPlayer.skip(trackIndex);
};
