import {View, Text} from 'react-native';
import React from 'react';

export default function ButtonContainer({}) {
  return (
    <View>
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
    </View>
  );
}
