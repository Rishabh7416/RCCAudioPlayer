import {
  View,
  Text,
  Animated,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Icon from './button/icon';
import {
  NextTrack,
  seekToTrack,
  PerviousTrack,
  getCurrentTrack,
  trackPlayerSetup,
  getCurrentTrackIndex,
  playBackStateToggling,
} from '../constants/trackPlayerFunctions';
import {SliderComp} from './slider/slider';
import {
  _animatedScreenHeight,
  _animatedImageHeight,
  _animatedImagePosition,
  _animatedSliderOpacity,
  _animatedTextOpacity,
  _panResponderHandlerFuncton,
} from '../constants/animation';
import {State, usePlaybackState} from 'react-native-track-player';

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
  // const scrollRef = React.useRef(0);
  const playBackState = usePlaybackState();
  const [currentHeight, setHeight] = React.useState(0);
  // const [currentQueue, setCurrentQueue] = React.useState([]);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const animation = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setHeight(height);
  };
  
  const setTrack = async () => {
    await getCurrentTrackIndex(index => {
      getCurrentTrack(setCurrentTrack, index);
    });
  };

  const setuptrack = async () => {
    await trackPlayerSetup(songLists);
    setTrack();
  };

  React.useEffect(() => {
    setuptrack();
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animation.extractOffset();
      },
      onPanResponderMove: (eve, gestureState) => {
        // console.log({...gestureState});
        // console.log(animation.getLayout());
        animation.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: (eve, gestureState) => {
        animation.flattenOffset();
        _panResponderHandlerFuncton(gestureState.dy, animation)
      },
    }),
  ).current;

  return (
    <Animated.View style={styles.animatedContainer}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.animatedTransform,
          {height: _animatedScreenHeight(animation)},
        ]}
        {...panResponder.panHandlers}>
        <Animated.View style={styles.animatedBottomTrack}>
          <Animated.View
            style={[
              styles.animatedBottomTrackContainer,
              {
                height: _animatedImageHeight(animation),
                width: _animatedImageHeight(animation),
                left: _animatedImagePosition(animation),
              },
            ]}>
            <Animated.Image
              style={styles.animatedPosterStyle}
              source={
                typeof currentTrack?.artwork === 'string' &&
                currentTrack?.artwork.includes('http')
                  ? {uri: `${currentTrack?.artwork}`}
                  : {uri: `${currentTrack?.artwork?.uri}`}
              }
            />
          </Animated.View>
          <Animated.View style={styles.animatedTitleContainer}>
            <View style={styles.titleView}>
              <Animated.Text
                style={[
                  styles.animatedTitleTxt,
                  {opacity: _animatedTextOpacity(animation)},
                ]}>
                {`${currentTrack?.title}`}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.animatedArtistTxt,
                  {opacity: _animatedTextOpacity(animation)},
                ]}>
                ({currentTrack?.artist})
              </Animated.Text>
            </View>
            <View style={{marginTop: 0, ...styles.buttonContainer}}>
              {playBackState === State.Connecting ? (
                <ActivityIndicator
                  style={styles.iconStyle}
                  color={'black'}
                  size={'large'}
                />
              ) : (
                <Icon
                  onPress={() => playBackStateToggling()}
                  iconStyle={styles.iconStyle}
                  icon={
                    playBackState !== State.Playing
                      ? playButtonIcon
                      : pauseButtonIcon
                  }
                />
              )}
              <Icon
                icon={skipToNextIcon}
                onPress={() => NextTrack(setTrack)}
                iconStyle={styles.skipToNextIconStyle}
              />
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.View style={{opacity: _animatedSliderOpacity(animation)}}>
          <Text style={styles.titleStyle}>{currentTrack?.title}</Text>
          <Text style = {styles.artistStyle}>{currentTrack?.artist}</Text>
          <SliderComp
            step={1}
            minimumValue={0}
            maximumTrackTintColor="grey"
            minimumTrackTintColor="aqua"
            onSlidingComplete={value => seekToTrack(value)}
            scrollPrevious={() => PerviousTrack(setTrack)}
            scrollNext={() => NextTrack(setTrack)}
            skipToPreviousIcon={skipToPreviousIcon}
            pauseButtonIcon={pauseButtonIcon}
            playButtonIcon={playButtonIcon}
            skipToNextIcon={skipToNextIcon}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(RCTrackPlayer);