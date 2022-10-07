import React from 'react';
import {SafeAreaView} from 'react-native';
import {tracks} from './src/constants/data';
import RCTrackPlayer from './src/components/trackPlayer';

export default function App() {
  return (
    <React.Fragment>
      <SafeAreaView />
      <RCTrackPlayer songLists={tracks} />
    </React.Fragment>
  );
}
