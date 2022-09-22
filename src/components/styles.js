import {StyleSheet} from 'react-native';
import {vh, vw, normalize} from '../constants/dimensions';

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '50%',
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
    height: vw(350),
    width: vw(350),
    resizeMode: 'contain',
    borderRadius: 10,
    margin: vw(2)
  },

  textStyle: {
    marginTop: vh(35),
    marginBottom: vh(5),
    fontSize: normalize(20),
    letterSpacing: normalize(0.5),
    fontWeight: '600',
  },
});
