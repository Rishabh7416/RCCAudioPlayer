import {StyleSheet} from 'react-native';
import {
  vh,
  vw,
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants/dimensions';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  buttonContainer: {
    // marginTop: vh(10),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconStyle: {
    width: vh(40),
    height: vh(40),
    marginHorizontal: vw(20),
  },

  playButtonIconStyle: {
    width: vw(56),
    height: vw(56),
    marginHorizontal: vw(20),
  },

  pauseButtonIconStyle: {
    width: vw(56),
    height: vw(56),
    backgroundColor: 'green',
    marginHorizontal: vw(20),
  },

  skipToNextIconStyle: {
    width: vw(24),
    height: vw(24),
  },

  skipToPreviousIconStyle: {
    width: vw(24),
    height: vw(24),
  },

  imagePosterStyles: {
    width: vw(360),
    height: vw(360),
    alignSelf: 'center',
    borderRadius: normalize(10),
  },

  textStyle: {
    fontWeight: '600',
    marginLeft: vw(20),
    fontSize: normalize(20),
    letterSpacing: normalize(0.5),
  },

  animatedContainer: {
    flex: 1,
    backgroundColor: 'red'
  },

  animatedTransform: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    position: 'absolute',
    height: SCREEN_HEIGHT,
    backgroundColor: 'white',
  },

  animatedBottomTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  animatedBottomTrackContainer: {
    marginTop: vh(10),
    left: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'black',
  },

  animatedPosterStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },

  animatedTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleView: {
    width: vw(150),
    flexDirection: 'column',
    marginHorizontal: vw(15),
  },

  animatedTitleTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: normalize(18),
  },

  animatedArtistTxt: {
    color: 'grey',
    fontWeight: '400',
    fontSize: normalize(18),
  },
});
