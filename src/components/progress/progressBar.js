import React from 'react';
import {Text, View} from 'react-native';
import { formatTime } from '../../constants/trackPlayerFunctions';

export const ProgressBar = ({trackTime}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: '80%',
          height: 8,
          marginVertical: 10,
          borderRadius: 5,
          borderColor: 'grey',
          borderWidth: 0.5,
        }}
      />
      <Text>{formatTime(trackTime)}</Text>
    </View>
  );
};
