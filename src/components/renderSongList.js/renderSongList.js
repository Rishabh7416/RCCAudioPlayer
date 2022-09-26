import {styles} from '../styles';
import React, {forwardRef, useRef, useState} from 'react';
import {Animated, Image} from 'react-native';
import {vw} from '../../constants/dimensions';

const RenderSongList = forwardRef(({songLists}, ref) => {
  const [currentIndex, setIndex] = useState(0);

  const renderSongsDetails = ({item}) => {
    return (
      <Animated.View
        style={{
          ...styles.imagePosterStyles,
          overflow: 'hidden',
          backgroundColor: 'red',
          // marginRight: vw(getMargin())
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            resizeMode: 'contain',
            height: '100%',
            width: '100%',
          }}
        />
      </Animated.View>
    );
  };

  const onViewableItemsChanged = listItem => {};

  const viewabilityConfig = {
    minimumViewTime: 600,
    itemVisiblePercentThreshold: 60,
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
      snapToInterval={vw(360.8)}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: ref}}}], {
        useNativeDriver: true,
      })}
    />
  );
});

export default React.memo(RenderSongList);
