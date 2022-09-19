import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },

  playButtonIconStyle: {
    height: 56,
    width: 56,
  },

  pauseButtonIconStyle: {
    height: 56,
    width: 56,
  },

  skipToNextIconStyle: {
    height: 24,
    width: 24,
  },

  skipToPreviousIconStyle: {
    height: 24,
    width: 24,
  },
  imagePosterStyles: {
    alignSelf: 'center',
    height: 290,
    width:380,
    marginLeft: 10,
    borderRadius: 10,
  },
});
