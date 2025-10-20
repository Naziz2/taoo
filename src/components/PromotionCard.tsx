import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

interface PromotionCardProps {
  title: string;
  thumbnail: string;
  discount: string;
  bgColor?: string;
}

export default function PromotionCard({ title, thumbnail, discount, bgColor }: PromotionCardProps) {
  return (
    <ImageBackground
      source={{ uri: thumbnail }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.discount}>{discount}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
  },
  content: {
    padding: 16,
    zIndex: 1,
  },
  discount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
