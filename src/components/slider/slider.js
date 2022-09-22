import React from 'react';
import Slider from '@react-native-community/slider';

export const SliderComp = ({
    step,
    minimumValue,
    value,
    maximumTrackTintColor,
    minimumTrackTintColor,
    maximumValue,
    onSlidingComplete
}) => {
  return (
    <Slider
      step={step}
      minimumValue={minimumValue}
      value={value}
      maximumTrackTintColor={maximumTrackTintColor}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumValue={maximumValue}
      onSlidingComplete={onSlidingComplete}
    />
  );
};
