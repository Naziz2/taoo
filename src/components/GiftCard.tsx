import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

interface GiftCardProps {
  thumbnail: string;
  amount: string;
  points: number;
  quantity: number;
}

export default function GiftCard({ thumbnail, amount, points, quantity }: GiftCardProps) {
  return (
    <ImageBackground
      source={{ uri: thumbnail }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.header}>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>Quantity: {quantity}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{points}</Text>
          <Text style={styles.coinIcon}>🪙</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
  backgroundImage: {
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  quantityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '600',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  coinIcon: {
    fontSize: 14,
    marginLeft: 4,
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
