import React from 'react';
import {styles} from './styles';
import Icon from './button/icon';
import TrackPlayer, {
  State,
  useProgress,
  usePlaybackState,
  RepeatMode,
} from 'react-native-track-player';
import {
  formatTime,
  seekToTrack,
  trackPlayerSetup,
  playBackStateToggling,
  skipToNextPreviousTrack,
} from '../constants/trackPlayerFunctions';
import RenderSongList from './renderSongList.js/renderSongList';
import {
  View,
  Text,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';

const {height, width} = Dimensions.get('screen');

TrackPlayer.updateOptions({
  stoppingAppPausesPlayback: true,
});

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const scrollToPreviousNext = React.useRef(null);
  const [songIndex, setSongIndex] = React.useState(0);
  const scrollRef = React.useRef(new Animated.Value(0)).current;

  const [repeatTracks, setRepeatTracks] = React.useState();

  const handleRepeatMode = () => {
    if(RepeatMode.Off) setRepeatTracks(RepeatMode.Track)
    else if(RepeatMode.Track) setRepeatTracks(RepeatMode.Queue)
    else setRepeatTracks(RepeatMode.Off)
  };

  const scrollNext = React.useCallback(() => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  }, [songIndex]);

  const scrollPrevious = React.useCallback(() => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  }, [songIndex]);

  React.useLayoutEffect(() => {
    scrollRef.addListener(({value}) => {
      const index = Math.round(value / width);
      skipToNextPreviousTrack(index);
      setSongIndex(index);
    });

    return () => scrollRef.removeAllListeners();
  }, []);

  React.useEffect(() => {
    trackPlayerSetup(songLists);
  }, []);

  return (
    <View style={{paddingHorizontal: 12}}>
      <RenderSongList songLists={songLists} ref={scrollRef} />
      <Text>{songLists[songIndex]?.title}</Text>
      <Text>{songLists[songIndex]?.artist}</Text>
      <Slider
        step={1}
        minimumValue={0}
        value={progress.position}
        maximumValue={progress.duration}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="aqua"
        thumbImage={''}
        onSlidingComplete={value => seekToTrack(value)}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 12}}>
          {formatTime(progress.position, true)}
        </Text>
        <Text style={{fontSize: 12}}>
          {formatTime(progress.duration, false)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRepeatMode}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/70/70196.png',
            }}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <Icon
          icon={skipToPreviousIcon}
          onPress={() => scrollPrevious()}
          containerStyle={{alignItems: 'center'}}
          iconStyle={styles.skipToPreviousIconStyle}
        />
        <Icon
          onPress={() => playBackStateToggling()}
          iconStyle={styles.playButtonIconStyle}
          containerStyle={{alignItems: 'center'}}
          icon={
            playBackState === State.Paused || playBackState === State.Ready
              ? playButtonIcon
              : pauseButtonIcon
          }
        />
        <Icon
          icon={skipToNextIcon}
          onPress={() => scrollNext()}
          iconStyle={styles.skipToNextIconStyle}
          containerStyle={{alignItems: 'center'}}
        />
        <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/70/70196.png'}}
          style={{height: 20, width: 20}}
        />
      </View>
    </View>
  );
};

export default React.memo(RCTrackPlayer);
