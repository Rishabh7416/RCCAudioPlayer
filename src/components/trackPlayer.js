import React from 'react';
import {styles} from './styles';
import {
  seekToTrack,
  trackPlayerSetup,
  skipToNextPreviousTrack,
} from '../constants/trackPlayerFunctions';
import {SliderComp} from './slider/slider';
import {vw} from '../constants/dimensions';
import TrackPlayer, {State} from 'react-native-track-player';
import {View, Text, Animated, Dimensions} from 'react-native';
import RenderSongList from './renderSongList.js/renderSongList';

const {height, width} = Dimensions.get('screen');

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
  // console.log('conponent renderer');
  const scrollToPreviousNext = React.useRef(null);
  const [songIndex, setSongIndex] = React.useState(0);
  const scrollRef = React.useRef(new Animated.Value(0)).current;

  const scrollNext = () => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex + 1) * width - vw(23),
    });
  };

  const scrollPrevious = React.useCallback(() => {
    scrollRef.current.scrollToOffset({
      offset: (songIndex - 1) * width - vw(23),
    });
  }, [songIndex]);

  React.useLayoutEffect(() => {
    trackPlayerSetup(songLists);

    scrollRef.addListener(({value}) => {
      const index = Math.round(value / width);
      skipToNextPreviousTrack(index);
      setSongIndex(index);
      console.log('index', index);
    });

    return () => {
      scrollRef.removeAllListeners();
      TrackPlayer.reset();
    };
  }, [songIndex]);

  return (
    <View style={{paddingHorizontal: vw(12)}}>
      <RenderSongList ref={scrollRef} songLists={songLists} state={State} />
      <Text style={styles.textStyle}>{songLists[songIndex]?.title}</Text>
      <Text style={{marginBottom: 10}}>{songLists[songIndex]?.artist}</Text>
      <SliderComp
        step={1}
        minimumValue={0}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="aqua"
        onSlidingComplete={value => seekToTrack(value)}
        scrollPrevious={() => scrollPrevious()}
        scrollNext={() => scrollNext()}
        skipToPreviousIcon={skipToPreviousIcon}
        pauseButtonIcon={pauseButtonIcon}
        playButtonIcon={playButtonIcon}
        skipToNextIcon={skipToNextIcon}
      />
    </View>
  );
};

export default React.memo(RCTrackPlayer);
