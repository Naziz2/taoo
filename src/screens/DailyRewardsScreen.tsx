import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import SpinWheel from '../components/SpinWheel';
import CanvasWheel, { CanvasWheelHandle } from '../components/CanvasWheel';

type DailyRewardsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DailyRewards'>;

interface WheelSegment {
  value: number;
  color: string;
  angle: number;
  prob: number;
}

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.7;

export default function DailyRewardsScreen() {
  const navigation = useNavigation<DailyRewardsScreenNavigationProp>();
  const { user } = useUser();
  const { t } = useLanguage();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation] = useState(new Animated.Value(0));
  const wheelRef = React.useRef<CanvasWheelHandle>(null);
  const [currentDay, setCurrentDay] = useState(7); // User has completed 7 days
  const [canPlay, setCanPlay] = useState(true);
  const [wonPoints, setWonPoints] = useState<number | null>(null);

  // Wheel segments with point values and probabilities
  const segments: WheelSegment[] = [
    { value: 50, color: '#1F2937', angle: 0, prob: 0.40 },
    { value: 100, color: '#EAB308', angle: 45, prob: 0.10 },
    { value: 20, color: '#1F2937', angle: 90, prob: 0.30 },
    { value: 500, color: '#EAB308', angle: 135, prob: 0.04 },
    { value: 200, color: '#1F2937', angle: 180, prob: 0.10 },
    { value: 1000, color: '#EAB308', angle: 225, prob: 0.02 },
    { value: 700, color: '#1F2937', angle: 270, prob: 0.03 },
    { value: 2000, color: '#EAB308', angle: 315, prob: 0.01 },
  ];

  const generateWeightedRandom = (): WheelSegment | null => {
    let cumulativeProbabilities = [];
    let sum = 0;
    
    for (let i = 0; i < segments.length; i++) {
      sum += segments[i].prob;
      cumulativeProbabilities.push(sum);
    }

    const randomFloat = Math.random();
    
    for (let i = 0; i < cumulativeProbabilities.length; i++) {
      if (randomFloat < cumulativeProbabilities[i]) {
        return segments[i];
      }
    }
    return null;
  };

  const handleSpin = () => {
    if (!canPlay || isSpinning) return;

    setIsSpinning(true);
    setWonPoints(null);
    
    const selectedSegment = generateWeightedRandom();
    
    if (!selectedSegment) {
      setIsSpinning(false);
      return;
    }
    // Spin canvas wheel to the selected label
    try {
      wheelRef.current?.spinTo(String(selectedSegment.value));
      // onSpinComplete will finalize state
    } catch (e) {
      // Fallback: finish immediately
      setIsSpinning(false);
      setWonPoints(selectedSegment.value);
      setCanPlay(false);
  Alert.alert(t('dailyRewards.congratsTitle'), t('dailyRewards.youWonPoints', { points: selectedSegment.value }), [{ text: 'OK' }]);
    }
  };

  const rotateInterpolate = rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#1F2937" />
        </TouchableOpacity>
  <Text style={styles.headerTitle}>{t('dailyRewards.title')}</Text>
        <TouchableOpacity
          style={styles.pointsBadge}
          activeOpacity={0.8}
        >
          <Text style={styles.pointsText}>{(user?.points || 0).toLocaleString()}</Text>
          <MaterialCommunityIcons name="circle-multiple" size={16} color="#EAB308" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Game Section */}
        <View style={styles.gameSection}>
          {/* Prize Badge */}
          <View style={styles.prizeBadge}>
            <MaterialCommunityIcons name="trophy" size={20} color="#1F2937" />
            <Text style={styles.prizeBadgeText}>{t('dailyRewards.specialGift')}</Text>
          </View>

          {/* Wheel Container */}
          <View style={styles.wheelContainer}>
            <View style={styles.wheelWrapper}>
              
              {/* Pointer removed as requested */}
              
              {/* Animated Wheel */}
              {/* Use Canvas-based wheel inside WebView */}
              <View style={styles.wheelAnimated}>
                <CanvasWheel
                  ref={wheelRef}
                  size={WHEEL_SIZE}
                  labels={segments.map(s => String(s.value))}
                  pointsLabel={t('points.abbr')}
                  onSpinComplete={(label) => {
                    const val = Number(label);
                    setIsSpinning(false);
                    setWonPoints(val);
                    setCanPlay(false);
                    Alert.alert(t('dailyRewards.congratsTitle'), t('dailyRewards.youWonPoints', { points: val }), [{ text: 'OK' }]);
                  }}
                />
                {/* Frame overlay to match the metal ring */}
                <Image
                  source={require('../../assets/wheel-frame.png')}
                  style={{
                    position: 'absolute',
                    width: WHEEL_SIZE * 1.15,
                    height: WHEEL_SIZE * 1.15,
                    top: -WHEEL_SIZE * 0.075,
                    left: -WHEEL_SIZE * 0.075,
                  }}
                  resizeMode="contain"
                />
              </View>

              {/* Center spin button overlay */}
              <TouchableOpacity
                style={styles.centerButton}
                onPress={handleSpin}
                disabled={!canPlay || isSpinning}
                activeOpacity={0.8}
              >
                <View style={styles.centerButtonCircle}>
                  <Text style={styles.centerButtonText}>🎯</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Win Result */}
          {wonPoints && (
            <View style={styles.winResult}>
              <Text style={styles.winTitle}>{t('dailyRewards.congratsTitle')}</Text>
              <View style={styles.winPoints}>
                <Text style={styles.winPointsText}>+{wonPoints}</Text>
                <MaterialCommunityIcons name="circle-multiple" size={24} color="#EAB308" />
              </View>
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{t('dailyRewards.infoTitle')}</Text>
          <Text style={styles.infoDescription}>{t('dailyRewards.infoDesc')}</Text>
        </View>

        {/* Play Status */}
        {!canPlay && (
          <View style={styles.statusCard}>
            <MaterialCommunityIcons name="star" size={24} color="#10B981" />
            <Text style={styles.statusText}>{t('dailyRewards.missionAccomplished')}</Text>
          </View>
        )}

        {/* Game Rules */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>{t('dailyRewards.rulesTitle')}</Text>
          
          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#DBEAFE' }]}>
              <MaterialCommunityIcons name="calendar" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.ruleText}>
              {t('dailyRewards.ruleStreak')}
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#E9D5FF' }]}>
              <MaterialCommunityIcons name="trophy" size={20} color="#A855F7" />
            </View>
            <Text style={styles.ruleText}>
              {t('dailyRewards.ruleInstant')}
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#FEF3C7' }]}>
              <MaterialCommunityIcons name="star" size={20} color="#EAB308" />
            </View>
            <Text style={styles.ruleText}>
              {t('dailyRewards.ruleMissedResets')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginLeft: 8,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  gameSection: {
    backgroundColor: '#4B5563',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  prizeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginBottom: 24,
  },
  prizeBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  wheelWrapper: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelAnimated: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
  },
  centerButton: {
    position: 'absolute',
    width: WHEEL_SIZE * 0.35,
    height: WHEEL_SIZE * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  centerButtonCircle: {
    width: '100%',
    height: '100%',
    borderRadius: (WHEEL_SIZE * 0.35) / 2,
    backgroundColor: '#EAB308',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  centerButtonText: {
    fontSize: 40,
  },
  centerButtonImage: {
    width: '100%',
    height: '100%',
  },
  centerLogoOverlay: {
    position: 'absolute',
    width: WHEEL_SIZE * 0.3,
    height: WHEEL_SIZE * 0.3,
    borderRadius: (WHEEL_SIZE * 0.3) / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#374151',
    zIndex: 10,
  },
  centerLogo: {
    width: WHEEL_SIZE * 0.2,
    height: WHEEL_SIZE * 0.2,
  },
  pointer: {
    position: 'absolute',
    top: -15,
    left: WHEEL_SIZE / 2 - 15,
    zIndex: 11,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#EAB308',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  spinButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  spinButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  spinButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  winResult: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  winTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  winPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  winPointsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusCard: {
    backgroundColor: '#D1FAE5',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#047857',
    flex: 1,
  },
  rulesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ruleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    paddingTop: 8,
  },
});
