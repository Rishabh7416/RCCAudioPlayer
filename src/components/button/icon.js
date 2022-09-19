import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Icon({onPress, icon, iconStyle}) {
  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={onPress}>
      <Image source={icon} style={iconStyle} />
    </TouchableOpacity>
  );
}
