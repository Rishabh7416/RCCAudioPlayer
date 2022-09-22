import {styles} from '../styles';
import React, {forwardRef} from 'react';
import {Animated, Image} from 'react-native';

const RenderSongList = forwardRef(({songLists}, ref) => {
  const renderSongsDetails = ({item}) => {
    return (
      <Animated.View>
        <Image source={{uri: item.image}} style={styles.imagePosterStyles} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={ref}
      horizontal
      pagingEnabled
      data={songLists}
      keyExtractor={item => item.id}
      renderItem={renderSongsDetails}
      decelerationRate={0}
      snapToInterval={380 + 10}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{justifyContent: 'center'}}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: ref}}}], {
        useNativeDriver: true,
      })}
    />
  );
});

export default React.memo(RenderSongList);
