import TrackPlayer, {
  Capability,
  RepeatMode,
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
    console.log('Playing')
    const trackState = await TrackPlayer.getState();
    if (trackState != State.Playing) TrackPlayer.play();
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
  if (timeInMin == -1) {
    timeInMin = 0;
  }
  if (timeInSec == -1) {
    timeInSec = 0;
  }
  var result =
    timeInSec % 60 === 0
      ? `${timeInMin}:00`
      : timeInSec > 9
      ? `0${timeInMin}:${timeInSec}`
      : `0${timeInMin}:0${timeInSec}`;
  return result;
};

export const PlayTrack = async () => {
  try {
    console.log('playasd-<>>>>>>><<<>>')
    await TrackPlayer.play();
  } catch (err) {
    console.log(err);
  }
};

export const PauseTrack = async () => {
  try {
    await TrackPlayer.pause();
  } catch (err) {
    console.log(err);
  }
};

export const SkipTo = async (index, callback) => {
  try {
    await TrackPlayer.skip(index, 0);
    callback();
  } catch (err) {
    console.log(err);
  }
};

export const NextTrack = async callback => {
  try {
    await TrackPlayer.skipToNext();
    callback();
  } catch (err) {
    console.log(err);
  }
};
export const PerviousTrack = async (callback) => {
  try {
    await TrackPlayer.skipToPrevious();
    callback();
  } catch (err) {
    console.log(err);
  }
};
export const SeekTo = async time => {
  try {
    await TrackPlayer.seekTo(time);
  } catch (err) {
    console.log(err);
  }
};

export const getState = async () => {
  try {
    const res = await TrackPlayer.getState();
    console.log('state', res);
  } catch (err) {
    console.log('state Error', err);
  }
};

export const getCurrentQueue = async callback => {
  try {
    const queue = await TrackPlayer.getQueue();
    console.log('Queue', queue);
    callback(queue);
  } catch (err) {
    console.log(err);
  }
};
export const getCurrentTrackIndex = async callback => {
  try {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    callback(currentTrackIndex);
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentTrack = async (callback, trackIndex) => {
  try {
    const track = await TrackPlayer.getTrack(trackIndex);

    callback(track);
  } catch (err) {
    console.log(err);
  }
};

export const repeatTrack=async()=>{
  try{
    TrackPlayer.setRepeatMode(RepeatMode.Track)
  }
  catch (err) {
    console.log(err);
  }
}
export const repeatQueue=async()=>{
  try{
    TrackPlayer.setRepeatMode(RepeatMode.Queue)
  }
  catch (err) {
    console.log(err);
  }
}
export const errorHandling = () => {};
