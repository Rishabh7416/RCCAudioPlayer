import React from 'react';
import {styles} from './styles';
import {
  seekToTrack,
  trackPlayerSetup,
  skipToNextPreviousTrack,
  PerviousTrack,
  NextTrack,
  getCurrentTrack,
  getCurrentTrackIndex
} from '../constants/trackPlayerFunctions';
import {SliderComp} from './slider/slider';
import {vw} from '../constants/dimensions';
import {State, useProgress} from 'react-native-track-player';
import {View, Text, Animated} from 'react-native';
import RenderSongList from './renderSongList.js/renderSongList';

const RCTrackPlayer = ({
  songLists,
  playButtonIcon,
  skipToNextIcon,
  pauseButtonIcon,
  skipToPreviousIcon,
}) => {
 
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [currentQueue, setCurrentQueue] = React.useState([]);
  const progress=useProgress();
  const scrollRef = React.useRef(0);

  const ScrollToIndex = () => {
    getCurrentTrackIndex(index =>{
      getCurrentTrack(setCurrentTrack,index)
      scrollRef.current.scrollToIndex({index, animated: true})},
    );
  };
   
const setuptrack =async() => { 
  await trackPlayerSetup(songLists);
  await  getCurrentTrackIndex(index => {
      getCurrentTrack(setCurrentTrack, index);
    })
}


  React.useEffect(() => {
    setuptrack()
  }, []);

  return (
    <View style={{flex:1}} >
      <RenderSongList ref={scrollRef} songLists={songLists} callBack={(res) => setCurrentTrack(res)} />
      <Text style={styles.textStyle}>{currentTrack?.title}</Text>
      <Text style={{marginBottom: 10}}>{currentTrack?.artist}</Text>
      <SliderComp
        step={1}
        minimumValue={0}
        maximumTrackTintColor="grey"
        minimumTrackTintColor="aqua"
        onSlidingComplete={value => seekToTrack(value)}
        scrollPrevious={() => PerviousTrack(ScrollToIndex)}
        scrollNext={() => NextTrack(ScrollToIndex)}
        skipToPreviousIcon={skipToPreviousIcon}
        pauseButtonIcon={pauseButtonIcon}
        playButtonIcon={playButtonIcon}
        skipToNextIcon={skipToNextIcon}
      />
    </View>
  );
};

export default React.memo(RCTrackPlayer);
