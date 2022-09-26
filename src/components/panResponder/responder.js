import {
  View,
  Text,
  Platform,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

const SCREEN_H = Dimensions.get('window').height;
const SCREEN_W = Dimensions.get('window').width;

export default function Responder() {
  React.useEffect(() => {
    const animation = new Animated.ValueXY({x: 0, y: SCREEN_H - 80});
  }, []);
  return (
    <Animated.View style={{backgroundColor: 'orange', flex: 1}}>
      <Animated.View
        style={[
          styles.container,
          {transform: animation.getTranslateTransform()},
        ]}></Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    height: SCREEN_H,
  },
});

// const bottomMax = height * 0.6;
// const bottomMin = height * 0.1;

// export default function Responder() {
//   const animateValue = React.useRef(new Animated.Value(0)).current;
//   const bottomLimit = React.useRef(0);
//   const panResponder = React.useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: (event, gesture) => {
//         animateValue.setOffset(bottomLimit.current)
//       },
//       onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
//         true,
//       onPanResponderMove: (event, gesture) => {
//         console.log('events',event)
//         animateValue.setValue(gesture.dy);
//       },
//       onPanResponderRelease: (event, gesture) => {
//         bottomLimit.current += gesture.dy;
//       },
//     }),
//   ).current;

//   return (
//     <View style={{flex: 1}}>
//       <Animated.View
//         style={[
//           styles.container,
//           {
//             transform: [{translateY: animateValue}],
//           },
//         ]}
//         {...panResponder.panHandlers}></Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     width: '100%',
//     height: bottomMax,
//     bottom: bottomMin - bottomMax,
//     ...Platform.select({
//       android: {elevation: 3},
//       ios: {
//         shadowColor: 'black',
//         shadowOpacity: 1,
//         shadowRadius: 6,
//         shadowOffset: {width: 2, height: 2},
//       },
//     }),
//     backgroundColor: 'black',
//   },
// });
