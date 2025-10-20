import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface DealCardProps {
  title: string;
  company: string;
  discount: string;
  points: number;
  thumbnail: string;
  background: string;
  titleColor: string;
  textColor: string;
  premium?: boolean;
  vip?: boolean;
  locked?: boolean;
  onPress?: () => void;
  onUpgradePress?: () => void;
  tier?: 'basic' | 'premium' | 'vip'; // For border styling
}

export default function DealCard({
  title,
  company,
  discount,
  points,
  thumbnail,
  background,
  titleColor,
  textColor,
  premium,
  vip,
  locked,
  onPress,
  onUpgradePress,
  tier = 'basic',
}: DealCardProps) {
  const { t } = useLanguage();
  
  // Determine border color based on tier
  const getBorderStyle = () => {
    if (vip) {
      return { borderWidth: 3, borderColor: '#FFD700' }; // Gold border for VIP
    } else if (premium) {
      return { borderWidth: 3, borderColor: '#C0C0C0' }; // Silver border for Premium
    } else {
      return { borderWidth: 3, borderColor: '#CD7F32' }; // Bronze border for Basic
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, getBorderStyle(), locked && styles.locked]}
      onPress={onPress}
      disabled={locked}
      activeOpacity={0.7}
    >
      <ImageBackground
        source={{ uri: thumbnail }}
        style={[styles.background, { backgroundColor: background }]}
        imageStyle={styles.backgroundImage}
      >
        {premium && (
          <View style={[styles.badge, locked ? styles.badgeLocked : styles.badgePremium]}>
            <Text style={styles.badgeText}>
              {locked ? (vip ? '🔒 VIP' : '🔒 Premium') : vip ? 'VIP' : 'Premium'}
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={[styles.company, { color: titleColor }]} numberOfLines={1}>
            {company}
          </Text>

          <View style={styles.info}>
            <Text style={[styles.discount, { color: textColor }]} numberOfLines={1}>
              {discount}
            </Text>
            <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
              {title}
            </Text>
          </View>

          <View style={[styles.pointsBadge, locked && styles.pointsBadgeLocked]}>
            <Text style={[styles.pointsText, locked && styles.pointsTextLocked]}>
              {locked ? 'Upgrade Required' : `${points} pts`}
            </Text>
          </View>
        </View>

        {locked && (
          <View style={styles.lockOverlay}>
            <View style={styles.lockMessage}>
              <Text style={styles.lockText}>{vip ? 'Gold' : 'Silver/Gold'} Required</Text>
              {onUpgradePress && (
                <TouchableOpacity 
                  style={styles.upgradeButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    onUpgradePress();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.upgradeButtonText}>{t('deals.upgradeNow')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 130,
    backgroundColor: '#FFFFFF',
  },
  locked: {
    opacity: 0.5,
  },
  background: {
    flex: 1,
    padding: 12,
  },
  backgroundImage: {
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePremium: {
    backgroundColor: '#9333EA',
  },
  badgeLocked: {
    backgroundColor: '#9CA3AF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  discount: {
    fontSize: 11,
    opacity: 0.8,
  },
  title: {
    fontSize: 11,
    opacity: 0.8,
  },
  pointsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAB308',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pointsBadgeLocked: {
    backgroundColor: '#D1D5DB',
  },
  pointsText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: 'bold',
  },
  pointsTextLocked: {
    color: '#6B7280',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockMessage: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  lockText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  upgradeButton: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
