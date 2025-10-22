import React from 'react';
import { Image, StyleSheet, ImageStyle, StyleProp } from 'react-native';

interface CoinIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export default function CoinIcon({ size = 16, style }: CoinIconProps) {
  return (
    <Image
      source={require('../../assets/coin-icon.png')}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}
