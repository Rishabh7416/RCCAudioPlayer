import React from 'react';
import {styles} from '../styles';
import Icon from '../button/icon';
import {
  formatTime,
  playBackStateToggling,
} from '../../constants/trackPlayerFunctions';
import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet} from 'react-native';
import {normalize, vh, vw} from '../../constants/dimensions';
import {State, usePlaybackState, useProgress} from 'react-native-track-player';

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
    <React.Fragment>
      <Slider
        step={step}
        minimumValue={minimumValue}
        value={progress.position}
        onValueChange={values => setTiming(values)}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumValue={progress.duration}
        onSlidingComplete={onSlidingComplete}
      />
      <View style={stylesA.titleContainer}>
        <Text style={stylesA.durationStyle}>{formatTime(timing, true)}</Text>
        <Text style={stylesA.durationStyle}>
          {`-${formatTime(progress.duration - timing, false)}`}
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
    </React.Fragment>
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

  durationStyle: {
    fontSize: normalize(10),
  },
});
