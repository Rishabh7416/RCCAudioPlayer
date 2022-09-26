import {StyleSheet} from 'react-native';
import {vh, vw, normalize} from '../constants/dimensions';

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(10),
    width: '50%',
    alignSelf: 'center',
  },

  playButtonIconStyle: {
    height: vw(56),
    width: vw(56),
  },

  pauseButtonIconStyle: {
    height: vw(56),
    width: vw(56),
  },

  skipToNextIconStyle: {
    height: vw(24),
    width: vw(24),
  },

  skipToPreviousIconStyle: {
    height: vw(24),
    width: vw(24),
  },
  imagePosterStyles: {
    alignSelf: 'center',
    height: vw(360),
    width: vw(360),
    borderRadius: normalize(10),
    // margin: vw(2)
  },

  textStyle: {
    marginTop: vh(35),
    marginBottom: vh(5),
    fontSize: normalize(20),
    letterSpacing: normalize(0.5),
    fontWeight: '600',
  },
});
