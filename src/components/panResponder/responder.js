import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/dimensions';

export default function Responder() {
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(false);
  const scrollOffset = 0;
  const animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - 90});
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gesture) => {
      if (
        (isScrollEnabled && scrollOffset <= 0 && gesture.dy > 0) ||
        (!isScrollEnabled && gesture.dy < 0)
      )
        return true;
      else return false;
    },
    onPanResponderGrant: (event, gesture) => {
      animation.extractOffset();
    },
    onPanResponderMove: (event, gesture) => {
      animation.setValue({x: 0, y: gesture.dy});
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.moveY > SCREEN_HEIGHT - 120) {
        Animated.spring(animation.y, {
          toValue: 0,
          tension: 1,
        }).start();
      } else if (gesture.moveY < 120) {
        Animated.spring(animation.y, {
          toValue: 0,
          tension: 1,
        }).start();
      } else if (gesture.dy < 0) {
        setIsScrollEnabled(true);
        Animated.spring(animation.y, {
          toValue: -SCREEN_HEIGHT + 120,
          tension: 1,
        }).start();
      } else if (gesture.dy > 0) {
        setIsScrollEnabled(false);
        Animated.spring(animation.y, {
          toValue: SCREEN_HEIGHT - 120,
          tension: 1,
        }).start();
      }
    },
  });

  const animatedHeight = {
    transform: animation.getTranslateTransform(),
  };

  animatedImageHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [200, 32],
    extrapolate: 'clamp',
  });
  animatedSongTitleOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  animatedImageMarginLeft = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [SCREEN_WIDTH / 2 - 100, 10],
    extrapolate: 'clamp',
  });
  animatedHeaderHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [SCREEN_HEIGHT / 2, 90],
    extrapolate: 'clamp',
  });
  animatedSongDetailsOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  animatedBackgroundColor = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: ['rgba(0,0,0,0.5)', 'white'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{flex: 1, backgroundColor: animatedBackgroundColor}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          animatedHeight,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: 'white',
            height: SCREEN_HEIGHT,
          },
        ]}>
        <ScrollView
          scrollEnabled={isScrollEnabled}
          scrollEventThrottle={16}
          onScroll={event => {
            scrollOffset = event.nativeEvent.contentOffset.y;
          }}>
          <Animated.View
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: 1,
              borderTopColor: '#ebe5e5',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
              <Animated.View
                style={{
                  height: animatedImageHeight,
                  width: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft,
                }}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={require('../../assets/images/icons/backward-track.png')}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  opacity: animatedSongTitleOpacity,
                  fontSize: 18,
                  paddingLeft: 10,
                }}>
                {'Song Name'}
              </Animated.Text>
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}
