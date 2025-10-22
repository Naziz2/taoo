import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface DailyRewardsWheelProps {
  onPointsWon?: (points: number) => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'DailyRewards'>;

export default function DailyRewardsWheel({ onPointsWon }: DailyRewardsWheelProps) {
  const { user } = useUser();
  const { t } = useLanguage();
  const navigation = useNavigation<NavigationProp>();
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const handlePlayNow = () => {
    navigation.navigate('DailyRewards');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=800' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      {/* Decorative elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>{t('dailyRewards.title')}</Text>
            <Text style={styles.headerSubtitle}>{t('dailyRewards.subtitleUpTo')}</Text>
            <View style={styles.pointsDisplay}>
              <Text style={styles.pointsText}>2000</Text>
              <View style={styles.coinIcon}>
                <MaterialCommunityIcons name="circle-multiple" size={20} color="#EAB308" />
              </View>
            </View>
            
            {!hasSpunToday && (
              <TouchableOpacity style={styles.playButton} onPress={handlePlayNow} activeOpacity={0.8}>
                <Text style={styles.playButtonText}>{t('dailyRewards.playNow')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={16} color="#1F2937" />
              </TouchableOpacity>
            )}

            {hasSpunToday && (
              <View style={styles.completedBadge}>
                <MaterialCommunityIcons name="check-circle" size={16} color="#10B981" />
                <Text style={styles.completedText}>{t('dailyRewards.alreadyPlayedToday')}</Text>
              </View>
            )}
          </View>

          {/* Wheel Preview */}
          <View style={styles.wheelPreview}>
            <View style={styles.wheelContainer}>
              <MaterialCommunityIcons name="google-circles-communities" size={120} color="#EAB308" />
              {/* Pointer */}
              <View style={styles.pointer}>
                <View style={styles.pointerTriangle} />
              </View>
            </View>
            {/* Gift decoration */}
            <View style={styles.giftDecoration}>
              <MaterialCommunityIcons name="trophy" size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#EAB308" />
            <Text style={styles.infoText}>{t('dailyRewards.chancePerDay')}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="star" size={16} color="#EAB308" />
            <Text style={styles.infoText}>{t('dailyRewards.rewardsRange')}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 200,
  },
  backgroundImage: {
    borderRadius: 16,
    opacity: 0.3,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -64,
    right: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -48,
    left: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: 'rgba(75, 85, 99, 0.85)',
    borderRadius: 16,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointsText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  wheelPreview: {
    position: 'relative',
  },
  wheelContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    top: -4,
    left: '50%',
    marginLeft: -12,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#EF4444',
  },
  giftDecoration: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EAB308',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
