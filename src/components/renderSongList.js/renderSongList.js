import {Animated, Image} from 'react-native';
import React, {forwardRef} from 'react';
import {styles} from '../styles';

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
      horizontal
      pagingEnabled
      ref={ref}
      data={songLists}
      keyExtractor={item => item.id}
      renderItem={renderSongsDetails}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{justifyContent: 'center'}}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x: ref}}}],
        {useNativeDriver: true},
      )}
    />
  );
});

export default RenderSongList;
