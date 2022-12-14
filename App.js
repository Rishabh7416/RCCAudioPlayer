import React from 'react';
import {SafeAreaView} from 'react-native';
import {tracks} from './src/constants/data';
import RCTrackPlayer from './src/components/trackPlayer';
import {LocalImages} from './src/assets/images/localimages';
import Responder from './src/components/panResponder/responder';

export default function App() {
  return (
    <React.Fragment>
      <SafeAreaView />
      {/* <Responder/> */}
      <RCTrackPlayer
        songLists={tracks}
        playButtonIcon={LocalImages.playButtonIcon}
        skipToNextIcon={LocalImages.skipToNextIcon}
        pauseButtonIcon={LocalImages.pauseButtonIcon}
        skipToPreviousIcon={LocalImages.skipToPreviousIcon}
      />
    </React.Fragment>
  );
}
