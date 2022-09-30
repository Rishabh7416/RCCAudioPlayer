import React, {forwardRef, useCallback, useRef, useState} from 'react';
import {StyleSheet, Animated, View, Image,FlatList} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {SCREEN_WIDTH, vw} from '../../constants/dimensions';
import { SkipTo,PlayTrack, getCurrentTrack, PauseTrack, NextTrack, getCurrentTrackIndex, PerviousTrack } from '../../constants/trackPlayerFunctions';

const RenderSongList = forwardRef(({songLists,callBack}, ref) => {
  

  const renderSongsDetails = ({item}) => {
    return (
      <View style={styles.container}>
        <Image
        resizeMode='contain'
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

  // const viewabilityConfig = {
  //   waitForInteraction: true,
  //   minimumViewTime: 600,
  //   itemVisiblePercentThreshold:85,
  // };

  // const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig,onViewableItemsChanged}]);

  return (
  //   <View style={{height:'100%',width:'100%'}}>
  //   <FlatList
  //  data={songLists}
  //  horizontal
  //  renderItem={({item})=>{
  //    return(
  //     <View style={styles.container}>
  //     <Image
  //     resizeMode='contain'
  //       style={{height:'100%',width:'100%'}}
  //       source={
  //         typeof item.artwork === 'string' && item.artwork.includes('http')
  //           ? {uri: `${item?.artwork}`}
  //           : {uri: `${item?.artwork?.uri}`}
  //       }
  //     />
  //   </View>
  //    )
  //  }}
  //  />
  //   </View>
    <View style={styles.mainContainer}>
      <FlatList
        ref={ref}
        horizontal={true}
        // scrollEnabled={true}
        // pagingEnabled
        // bounces={false}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        data={songLists}
        keyExtractor={item => item.id}
        renderItem={renderSongsDetails}
        // contentContainerStyle={{backgroundColor:'green',width: 200}}
        showsHorizontalScrollIndicator={false}
        
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width:'100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor:'black',
    width: 300,
    height: 400,
    // width:'100%',
    // height:'100%',
    margin:5,
  },
  artwork: {
    height:'100%',
    width:'100%'
  },
});

export default React.memo(RenderSongList);
