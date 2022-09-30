import {StyleSheet} from 'react-native';
import {vh, vw, normalize} from '../constants/dimensions';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(10),
    // width: '50%',
    alignSelf: 'center',
  },
  iconStyle: {
    height: 40,
    width: 40,
    marginHorizontal: vw(20),
  },
  playButtonIconStyle: {
    height: vw(56),
    width: vw(56),
    marginHorizontal: vw(20),
  },

  pauseButtonIconStyle: {
    height: vw(56),
    width: vw(56),
    backgroundColor:'green',
    marginHorizontal: vw(20),
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
    // marginTop: vh(35),
    // marginBottom: vh(5),
    marginLeft: vw(20),
    fontSize: normalize(20),
    letterSpacing: normalize(0.5),
    fontWeight: '600',
  },
});
