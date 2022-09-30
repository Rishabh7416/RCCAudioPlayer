import React, {useRef} from 'react';
import {styles} from './styles';
import {
  seekToTrack,
  trackPlayerSetup,
  skipToNextPreviousTrack,
  PerviousTrack,
  NextTrack,
  getCurrentTrack,
  getCurrentTrackIndex,
  playBackStateToggling,
} from '../constants/trackPlayerFunctions';
import {SliderComp} from './slider/slider';
import {
  SCREEN_HEIGHT,
  SCREEN_HEIGHT_SCREEN,
  vh,
  vw,
} from '../constants/dimensions';
import {State, usePlaybackState, useProgress} from 'react-native-track-player';
import {
  View,
  Text,
  Animated,
  Image,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import RenderSongList from './renderSongList.js/renderSongList';
import {transform} from '@babel/core';
import Icon from './button/icon';

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [currentQueue, setCurrentQueue] = React.useState([]);
  const [currentHeight, setHeight] = React.useState(0);
  const progress = useProgress();
  const scrollRef = React.useRef(0);
  const playBackState = usePlaybackState();

  // console.log('currentHeight',currentHeight)
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

  const animation = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animation.extractOffset();
      },
      onPanResponderMove: (eve, gestureState) => {
        console.log({...gestureState});
        // console.log(gestureState.y0)
        console.log(animation.getLayout());

        animation.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: (eve, gestureState) => {
        // console.log( 'gesture',gestureState.dy)
        animation.flattenOffset();
        if (gestureState.dy < 0) {
          Animated.timing(animation.y, {
            toValue: 0,
            duration: 500,
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.timing(animation.y, {
            toValue: 900,
            duration: 500,
          }).start();
        }
      },
    }),
  ).current;

  const animatedScreenPosition = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [-SCREEN_HEIGHT + 100, 0],
    extrapolate: 'clamp',
  });
  const animatedScreenHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [SCREEN_HEIGHT - 48, 100],
    extrapolate: 'clamp',
  });
  const animatedImageHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 150],
    outputRange: [350, 40],
    extrapolate: 'clamp',
  });
  const animatedImagePosition = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 150],
    outputRange: [20, 10],
    extrapolate: 'clamp',
  });
  const animatedTrackInfoViewPosition = animation.y.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });
  const animatedTextOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const animatedSliderOpacity = animation.y.interpolate({
    inputRange: [100, 400],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={{flex: 1, backgroundColor: 'lightgrey'}}>
      <Animated.View
        onLayout={onLayout}
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'white',
            height: animatedScreenHeight,
          },
        ]}
        {...panResponder.panHandlers}>
        <Animated.View
          style={{
            borderTopWidth: 1,
            borderTopColor: 'orange',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              alignItems: 'center',
              marginTop: vh(10),
              height: animatedImageHeight,
              width: animatedImageHeight,
              left: animatedImagePosition,
            }}>
            <Animated.Image
              style={{
                height: '100%',
                width: '100%',
                // left: animatedImagePosition,
                // marginLeft: vw(10),
                backgroundColor: 'white',
              }}
              source={
                typeof currentTrack?.artwork === 'string' &&
                currentTrack?.artwork.includes('http')
                  ? {uri: `${currentTrack?.artwork}`}
                  : {uri: `${currentTrack?.artwork?.uri}`}
              }
            />
          </Animated.View>

          <Animated.View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              left: animatedTrackInfoViewPosition,
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: vw(15),
                width: vw(150),
              }}>
              <Animated.Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 18,
                  opacity: animatedTextOpacity,
                }}>{`${currentTrack?.title}`}</Animated.Text>
              <Animated.Text
                style={{
                  color: 'grey',
                  fontWeight: '400',
                  fontSize: 18,
                  opacity: animatedTextOpacity,
                }}>
                ({currentTrack?.artist})
              </Animated.Text>
            </View>
            <View style={{marginTop:0,...styles.buttonContainer}}>
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

        <Animated.View style={{opacity: animatedSliderOpacity}}>
          <Text style={styles.textStyle}>{currentTrack?.title}</Text>
          <Text style={{marginBottom: 10, marginLeft: vw(20)}}>
            {currentTrack?.artist}
          </Text>
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
