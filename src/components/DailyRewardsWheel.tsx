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
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface DailyRewardsWheelProps {
  onPointsWon?: (points: number) => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'DailyRewards'>;

// Account level configuration
const accountLevels = {
  basic: { dailyCheckinPoints: 1, displayName: 'Basic' },
  silver: { dailyCheckinPoints: 5, displayName: 'Silver' },
  gold: { dailyCheckinPoints: 7, displayName: 'Gold' },
};

export default function DailyRewardsWheel({ onPointsWon }: DailyRewardsWheelProps) {
  const { user } = useUser();
  const navigation = useNavigation<NavigationProp>();
  const [currentDay] = useState(Math.floor(Math.random() * 6) + 1); // 1-6 to show progress

  // Get user's daily check-in points based on their level
  const userLevel = user?.level || 'basic';
  const dailyPoints = accountLevels[userLevel as keyof typeof accountLevels]?.dailyCheckinPoints || 1;

  const getDayStatus = (day: number) => {
    if (day <= currentDay) return 'completed';
    if (day === currentDay + 1) return 'current';
    return 'locked';
  };

  const getDayIcon = (day: number) => {
    const status = getDayStatus(day);
    if (status === 'completed') return '✓';
    if (day === 7) return '🎁';
    return day.toString();
  };

  const getDayColor = (day: number) => {
    const status = getDayStatus(day);
    switch (status) {
      case 'completed': return styles.dayCompleted;
      case 'current': return styles.dayCurrent;
      case 'locked': return styles.dayLocked;
      default: return styles.dayLocked;
    }
  };

  const handlePlayNow = () => {
    navigation.navigate('DailyRewards');
  };

  // Check if user completed 7 days
  const isDay7 = currentDay === 7;

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
          {!isDay7 ? (
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Récompense quotidienne</Text>
              <Text style={styles.headerSubtitle}>vous avez reçu</Text>
              <View style={styles.pointsDisplay}>
                <Text style={styles.pointsText}>+ {dailyPoints}</Text>
                <View style={styles.coinIcon}>
                  <MaterialCommunityIcons name="circle-multiple" size={20} color="#EAB308" />
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.headerLeft} onPress={handlePlayNow} activeOpacity={0.8}>
              <Text style={styles.headerTitle}>Bravo!</Text>
              <Text style={styles.headerSubtitle}>Récompense pour votre série de 7 jours</Text>
              <View style={styles.pointsDisplay}>
                <Text style={styles.pointsText}>2000</Text>
                <View style={styles.coinIcon}>
                  <MaterialCommunityIcons name="circle-multiple" size={20} color="#EAB308" />
                </View>
              </View>
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>Tournez la roue</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Wheel Preview */}
          <View style={styles.wheelPreview}>
            <View style={styles.wheelContainer}>
              <MaterialCommunityIcons name="google-circles-communities" size={120} color="#EAB308" />
              {/* Pointer */}
              <View style={styles.pointer}>
                <MaterialCommunityIcons name="menu-down" size={24} color="#FFFFFF" />
              </View>
            </View>
            {/* Gift decoration */}
            <View style={styles.giftDecoration}>
              <MaterialCommunityIcons name="gift" size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* 7-Day Progress */}
        {!isDay7 && (
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>
              Plus que <Text style={styles.progressHighlight}>{7 - currentDay} jours</Text> pour accéder au GRAND PRIX
            </Text>

            {/* Progress Chain */}
            <View style={styles.progressChain}>
              {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                <React.Fragment key={day}>
                  <View style={[styles.dayCircle, getDayColor(day)]}>
                    <Text style={[styles.dayText, day <= currentDay && styles.dayTextCompleted]}>
                      {getDayIcon(day)}
                    </Text>
                  </View>
                  {index < 6 && (
                    <View style={[styles.connector, day <= currentDay && styles.connectorActive]} />
                  )}
                </React.Fragment>
              ))}
            </View>

            {/* Grand Prize Badge */}
            <View style={styles.grandPrizeBadge}>
              <MaterialCommunityIcons name="trophy" size={16} color="#1F2937" />
              <Text style={styles.grandPrizeText}>GRAND PRIX: jusqu'à 2000 pts</Text>
            </View>
          </View>
        )}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
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
  giftDecoration: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
  },
  progressSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressHighlight: {
    color: '#EAB308',
    fontWeight: '700',
  },
  progressChain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: '#EAB308',
  },
  dayCurrent: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EAB308',
  },
  dayLocked: {
    backgroundColor: '#6B7280',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D1D5DB',
  },
  dayTextCompleted: {
    color: '#1F2937',
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: '#6B7280',
    marginHorizontal: 2,
  },
  connectorActive: {
    backgroundColor: '#EAB308',
  },
  grandPrizeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
    gap: 4,
  },
  grandPrizeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
  },
});
