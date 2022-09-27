import React, {forwardRef, useCallback, useRef, useState} from 'react';
import {StyleSheet, Animated, View, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {SCREEN_WIDTH, vw} from '../../constants/dimensions';
import { SkipTo,PlayTrack, getCurrentTrack, PauseTrack, NextTrack, getCurrentTrackIndex, PerviousTrack } from '../../constants/trackPlayerFunctions';

const RenderSongList = forwardRef(({songLists,callBack}, ref) => {
  

  const renderSongsDetails = ({item}) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.artwork}
          source={
            typeof item.artwork === 'string' && item.artwork.includes('http')
              ? {uri: `${item?.artwork}`}
              : {uri: `${item?.artwork?.uri}`}
          }
        />
      </View>
    );
  };

  const CheckTrackIndex = async viewableIndex => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    console.log(currentTrackIndex, viewableIndex);

    if (viewableIndex > currentTrackIndex) NextTrack();
    else if (viewableIndex < currentTrackIndex) PerviousTrack();
  };

   const onViewableItemsChanged = React.useCallback(({viewableItems, changed}) => {



    if (changed[0].isViewable) {

    const viewableIndex= viewableItems[0].index;
    console.log(viewableIndex)
    //  CheckTrackIndex(viewableIndex)
      SkipTo(viewableItems[0].index,()=>{
        getCurrentTrack((track)=>{callBack(track)},viewableItems[0].index)});
     }
  }, []);

  const viewabilityConfig = {
    waitForInteraction: true,
    minimumViewTime: 600,
    itemVisiblePercentThreshold:85,
  };

  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig,onViewableItemsChanged}]);

  return (
    <View style={styles.mainContainer}>
      <Animated.FlatList
        ref={ref}
        horizontal={true}
        pagingEnabled
        bounces={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        data={songLists}
        keyExtractor={item => item.id}
        renderItem={renderSongsDetails}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  artwork: {
    aspectRatio: 1,
    height: 350,
  },
});

export default React.memo(RenderSongList);
