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
  _animatedTextOpacity,
  _animatedImageHeight,
  _animatedScreenHeight,
  _animatedImagePosition,
  _animatedSliderOpacity,
  _panResponderHandlerFuncton,
} from '../constants/animation';
import {LocalImages} from '../assets/images/localimages';
import {State, usePlaybackState} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT} from '../constants/dimensions';

const RCTrackPlayer = ({
  songLists = [],
  playButtonIcon = LocalImages.playButtonIcon,
  titleViewStyle,
  skipToNextIcon,
  pauseButtonIcon,
  gradientColor = ['#EDE4E0', '#98A8F8'],
  skipToPreviousIcon,
  animatedTitleTxtStyle,
  animatedContainerStyle,
  animatedArtistTxtStyle,
  animatedPosterStyleProp,
  animatedBottomTrackStyle,
  animatedTitleContainerStyle,
  animatedBottomTrackContainerStyle,
}) => {
  const propHandler = {
    songLists_key: songLists ? songLists : null,
    titleViewStyle: titleViewStyle ? titleViewStyle : styles.titleView,
    playButtonIcon_key: playButtonIcon
      ? playButtonIcon
      : LocalImages.playButtonIcon,
    skipToNextIcon_key: skipToNextIcon
      ? skipToNextIcon
      : LocalImages.skipToNextIcon,
    pauseButtonIcon_key: pauseButtonIcon
      ? pauseButtonIcon
      : LocalImages.pauseButtonIcon,
    skipToPreviousIcon_key: skipToPreviousIcon
      ? skipToPreviousIcon
      : LocalImages.skipToPreviousIcon,
    animatedTitleTxtStyle: animatedTitleTxtStyle
      ? animatedTitleTxtStyle
      : styles.animatedTitleTxt,
    animatedArtistTxtStyle: animatedArtistTxtStyle
      ? animatedArtistTxtStyle
      : styles.animatedArtistTxt,
    animatedPosterStyle_key: animatedPosterStyleProp
      ? animatedPosterStyleProp
      : styles.animatedPosterStyle,
    animatedBottomTrack_key: animatedBottomTrackStyle
      ? animatedBottomTrackStyle
      : styles.animatedBottomTrack,
    animatedContainerStyle_key: animatedContainerStyle
      ? animatedContainerStyle
      : styles.animatedContainer,
    animatedTitleContainerStyle_key: animatedTitleContainerStyle
      ? animatedTitleContainerStyle
      : styles.animatedTitleContainer,
    animatedBottomTrackContainer_key: animatedBottomTrackContainerStyle
      ? animatedBottomTrackContainerStyle
      : styles.animatedBottomTrackContainer,
    gradientColor: gradientColor ? gradientColor : ['#EDE4E0', '#98A8F8'],
  };

  const playBackState = usePlaybackState();

  const [currentTrack, setCurrentTrack] = React.useState(null);
  const animation = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  /**
   * set current track
   */
  const setTrack = async () => {
    await getCurrentTrackIndex(index => {
      getCurrentTrack(setCurrentTrack, index);
    });
  };

  /**
   * function to change the poster of the image
   */
  const onChangeTrack = () => {
    setTrack();
  };

  /**
   * track player setup
   */
  const setuptrack = async () => {
    await trackPlayerSetup(songLists);
    setTrack();
  };

  React.useEffect(() => {
    setuptrack();
  }, []);


  /**
   * @description
   * @function
   * 
   */
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animation.extractOffset();
      },
      onPanResponderMove: (eve, gestureState) => {
        animation.y.setValue(gestureState.dy);
      },
      onPanResponderRelease: (eve, gestureState) => {
        animation.flattenOffset();
        _panResponderHandlerFuncton(gestureState.dy, animation);
      },
    }),
  ).current;

  return (
    <Animated.View style={propHandler.animatedContainerStyle_key}>
      <Animated.View
        style={[
          styles.animatedTransform,
          {height: _animatedScreenHeight(animation)},
        ]}
        {...panResponder.panHandlers}>
        <LinearGradient
          colors={propHandler.gradientColor}
          style={styles.gredientView}>
          <Animated.View style={propHandler.animatedBottomTrack_key}>
            <Animated.View
              style={[
                propHandler.animatedBottomTrackContainer_key,
                {
                  width: _animatedImageHeight(animation),
                  left: _animatedImagePosition(animation),
                  height: _animatedImageHeight(animation),
                },
              ]}>
              <Animated.Image
                style={propHandler.animatedPosterStyle_key}
                source={
                  typeof currentTrack?.artwork === 'string' &&
                  currentTrack?.artwork.includes('http')
                    ? {uri: `${currentTrack?.artwork}`}
                    : {uri: `${currentTrack?.artwork?.uri}`}
                }
              />
            </Animated.View>
            <Animated.View style={propHandler.animatedTitleContainerStyle_key}>
              <View style={propHandler.titleViewStyle}>
                <Animated.Text
                  style={[
                    propHandler.animatedTitleTxtStyle,
                    {opacity: _animatedTextOpacity(animation)},
                  ]}>
                  {`${currentTrack?.title}`}
                </Animated.Text>
                <Animated.Text
                  style={[
                    propHandler.animatedArtistTxtStyle,
                    {opacity: _animatedTextOpacity(animation)},
                  ]}>
                  ({currentTrack?.artist})
                </Animated.Text>
              </View>
              <View style={styles.buttonContainer}>
                {playBackState === State.Connecting ? (
                  <ActivityIndicator
                    size={'large'}
                    color={'black'}
                    style={styles.iconStyle}
                  />
                ) : (
                  <Icon
                    iconStyle={styles.iconStyle}
                    onPress={playBackStateToggling}
                    icon={
                      playBackState !== State.Playing
                        ? propHandler.playButtonIcon_key
                        : propHandler.pauseButtonIcon_key
                    }
                  />
                )}
                <Icon
                  onPress={() => NextTrack(setTrack)}
                  icon={propHandler.skipToNextIcon_key}
                  iconStyle={styles.skipToNextIconStyle}
                />
              </View>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{opacity: _animatedSliderOpacity(animation)}}>
            <Text style={styles.titleStyle}>{currentTrack?.title}</Text>
            <Text style={styles.artistStyle}>{currentTrack?.artist}</Text>
            <SliderComp
              step={1}
              minimumValue={0}
              onChangeTrackCallBack={onChangeTrack}
              maximumTrackTintColor="lightgrey"
              minimumTrackTintColor="grey"
              scrollNext={() => NextTrack(setTrack)}
              scrollPrevious={() => PerviousTrack(setTrack)}
              onSlidingComplete={value => seekToTrack(value)}
              playButtonIcon={propHandler.playButtonIcon_key}
              skipToNextIcon={propHandler.skipToNextIcon_key}
              pauseButtonIcon={propHandler.pauseButtonIcon_key}
              skipToPreviousIcon={propHandler.skipToPreviousIcon_key}
            />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(RCTrackPlayer);
