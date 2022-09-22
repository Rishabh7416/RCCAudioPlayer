import {styles} from '../styles';
import React, {forwardRef, useRef} from 'react';
import {Animated, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const RenderSongList = forwardRef(({songLists}, ref) => {
  const renderSongsDetails = ({item}) => {
    return (
      <Animated.View>
        <Image source={{uri: item.image}} style={styles.imagePosterStyles} />
      </Animated.View>
    );
  };

  const onViewableItemsChanged = listItem => {
    if (listItem.viewableItems[0].index !== listItem.changed[0].index) {
      TrackPlayer.play();
      if (listItem.viewableItems[0].index) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    } else {
      TrackPlayer.pause();
    }
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  return (
    <Animated.FlatList
      ref={ref}
      horizontal
      pagingEnabled
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      data={songLists}
      keyExtractor={item => item.id}
      renderItem={renderSongsDetails}
      decelerationRate={0}
      snapToInterval={360 + 10}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{justifyContent: 'center'}}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: ref}}}], {
        useNativeDriver: true,
      })}
    />
  );
});

export default React.memo(RenderSongList);
