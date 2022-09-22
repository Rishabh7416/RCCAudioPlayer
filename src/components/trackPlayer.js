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
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RenderSongList from './renderSongList.js/renderSongList';
import {SliderComp} from './slider/slider';
import {StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
  console.log('component rendering');
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const scrollToPreviousNext = React.useRef(null);
  const [songIndex, setSongIndex] = React.useState(0);
  const scrollRef = React.useRef(new Animated.Value(0)).current;

  const scrollNext = () => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    // if (Math.round(progress.position) > 5) {
    //   TrackPlayer.reset()
    // }
    // else {
    //   scrollRef.current.scrollToOffset({
    //     offset: (songIndex + 1) * width,
    //   });
    // }
  };

  const scrollPrevious = React.useCallback(() => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  }, [songIndex]);

  React.useLayoutEffect(() => {
    trackPlayerSetup(songLists);

    scrollRef.addListener(({value}) => {
      const index = Math.round(value / width);
      skipToNextPreviousTrack(index);
      setSongIndex(index);
    });
    return () => scrollRef.removeAllListeners();
  }, []);

  return (
    <View style={{paddingHorizontal: 12}}>
      <RenderSongList songLists={songLists} ref={scrollRef} />
      <Text>{songLists[songIndex]?.title}</Text>
      <Text>{songLists[songIndex]?.artist}</Text>
      <SliderComp
        step={1}
        minimumValue={0}
        value={progress.position}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="aqua"
        maximumValue={progress.duration}
        onSlidingComplete={value => seekToTrack(value)}
      />
      <View style={stylesA.titleContainer}>
        <Text style={{fontSize: 12}}>
          {formatTime(progress.position, true)}
        </Text>
        <Text style={{fontSize: 12}}>
          {formatTime(progress.duration, false)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
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
            playBackState !== State.Playing ? playButtonIcon : pauseButtonIcon
          }
        />
        <Icon
          icon={skipToNextIcon}
          onPress={() => scrollNext()}
          iconStyle={styles.skipToNextIconStyle}
          containerStyle={{alignItems: 'center'}}
        />
      </View>
    </View>
  );
};

export default React.memo(RCTrackPlayer);

const stylesA = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
