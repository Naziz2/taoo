import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PartnerStoreProps {
  name: string;
  logo: string;
  bgColor?: string;
  onPress?: () => void;
}

export default function PartnerStore({ name, logo, bgColor = '#EAB308', onPress }: PartnerStoreProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.logoCircle, { backgroundColor: bgColor }]}>
        <Text style={styles.logoText}>{logo}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
});
