import React from 'react';
import {styles} from '../styles';
import Icon from '../button/icon';
import {
  formatTime,
  playBackStateToggling,
} from '../../constants/trackPlayerFunctions';
import Slider from '@react-native-community/slider';
import {normalize, SCREEN_WIDTH, vh, vw} from '../../constants/dimensions';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {State, usePlaybackState, useProgress} from 'react-native-track-player';
import { LocalImages } from '../../assets/images/localimages';

export const SliderComp = ({
  step,
  scrollNext,
  minimumValue,
  scrollPrevious,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  onSlidingComplete,
  skipToPreviousIcon,
  maximumTrackTintColor,
  minimumTrackTintColor,
}) => {
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const [timing, setTiming] = React.useState(0);
  return (
    <View style={stylesA.mainSlider}>
      <Slider
        step={step}
        tapToSeek={true}
        value={progress.position}
        minimumValue={minimumValue}
        maximumValue={progress.duration}
        onSlidingComplete={onSlidingComplete}
        onValueChange={values => setTiming(values)}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        // thumbImage = {LocalImages.thumbIcon}
      />
      <View style={stylesA.titleContainer}>
        <Text style={stylesA.durationStyle}>
          {formatTime(progress.position, true)}
        </Text>
        <Text style={stylesA.durationStyle}>
          {`${formatTime(progress.duration - progress.position, false)}`}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Icon
          icon={LocalImages.repeat}
          onPress={() => scrollNext()}
          iconStyle={styles.repeatIconStyle}
        />
        <View style={styles.centerBtn}>
          <Icon
            icon={skipToPreviousIcon}
            onPress={() => scrollPrevious()}
            containerStyle={{alignItems: 'center'}}
            iconStyle={styles.skipToPreviousIconStyle}
          />
          {playBackState === State.Connecting ? (
            <ActivityIndicator
              color={'black'}
              size={'large'}
              style={styles.playButtonIconStyle}
            />
          ) : (
            <Icon
              onPress={() => playBackStateToggling()}
              iconStyle={styles.playButtonIconStyle}
              containerStyle={{alignItems: 'center'}}
              icon={
                playBackState !== State.Playing
                  ? playButtonIcon
                  : pauseButtonIcon
              }
            />
          )}
          <Icon
            icon={skipToNextIcon}
            onPress={() => scrollNext()}
            iconStyle={styles.skipToNextIconStyle}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <Icon
          icon={LocalImages.heart}
          onPress={() => scrollNext()}
          iconStyle={styles.likeIconStyle}
        />
      </View>
    </View>
  );
};

const stylesA = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textStyle: {
    marginTop: vh(35),
    marginBottom: vh(5),
    fontSize: normalize(20),
    letterSpacing: normalize(0.5),
    fontWeight: '600',
  },

  bufferIcon: {
    height: vw(56),
    width: vw(56),
    marginHorizontal: vw(20),
  },

  durationStyle: {
    fontSize: normalize(10),
  },
});
