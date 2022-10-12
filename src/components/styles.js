import {StyleSheet} from 'react-native';
import {
  vh,
  vw,
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants/dimensions';

export const styles = StyleSheet.create({
  main: {flex: 1},

  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width:SCREEN_WIDTH-20,
    
  },
  centerBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft:vw(40)
    
  },
  iconStyle: {
    width: vh(40),
    height: vh(40),
    marginHorizontal:vw(20),
  },

  playButtonIconStyle: {
    width: vw(56),
    height: vw(56),
    marginHorizontal: vw(25),
  },

 

  skipToNextIconStyle: {
    width: vw(24),
    height: vw(24),
  },
repeatIconStyle:{
  width: vw(34),
  height: vw(34),
  marginLeft:vw(25)
},
likeIconStyle:{
  width: vw(38),
  height: vw(38),
  marginLeft:vw(35)
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

  titleStyle: {
    fontWeight: '700',
    fontSize: normalize(22),
    letterSpacing: normalize(0.5),
    marginTop: vh(30),
    marginBottom: vh(5),
  },

  artistStyle: {
    color: 'grey',
    fontWeight: '600',
    fontWeight: '300',
  },

  animatedContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },

  animatedTransform: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    position: 'absolute',
    height: SCREEN_HEIGHT,
  },
  gredientView: {flex: 1, paddingHorizontal: vw(10)},
  animatedBottomTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  animatedBottomTrackContainer: {
    marginTop: vh(10),
    left: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    // backgroundColor: 'black',
  },

  animatedPosterStyle: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    borderRadius: vh(5)
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
