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
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUser } from '../contexts/UserContext';

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
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation] = useState(new Animated.Value(0));
  const [currentDay, setCurrentDay] = useState(7); // User has completed 7 days
  const [canPlay, setCanPlay] = useState(true);
  const [wonPoints, setWonPoints] = useState<number | null>(null);

  // Wheel segments with point values and probabilities
  const segments: WheelSegment[] = [
    { value: 100, color: '#f0932b', angle: 0, prob: 0.10 },
    { value: 20, color: '#f9ca24', angle: 45, prob: 0.30 },
    { value: 200, color: '#f0932b', angle: 90, prob: 0.10 },
    { value: 2000, color: '#f9ca24', angle: 135, prob: 0.01 },
    { value: 50, color: '#f0932b', angle: 180, prob: 0.40 },
    { value: 1000, color: '#f9ca24', angle: 225, prob: 0.02 },
    { value: 500, color: '#f0932b', angle: 270, prob: 0.04 },
    { value: 700, color: '#f9ca24', angle: 315, prob: 0.03 },
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
    
    // Calculate final rotation to land on selected segment
    const randomRotation = 1800 - selectedSegment.angle + 20;
    
    Animated.timing(rotation, {
      toValue: randomRotation,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setWonPoints(selectedSegment.value);
      setCanPlay(false);
      
      Alert.alert(
        'Félicitations! 🎉',
        `Vous avez gagné ${selectedSegment.value} points!`,
        [{ text: 'OK' }]
      );
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

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
        <Text style={styles.headerTitle}>Roue de la Fortune</Text>
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
            <Text style={styles.prizeBadgeText}>Cadeau Spécial</Text>
          </View>

          {/* Wheel Container */}
          <View style={styles.wheelContainer}>
            <View style={styles.wheelWrapper}>
              <Animated.View
                style={[
                  styles.wheel,
                  { transform: [{ rotate: rotateInterpolate }] },
                ]}
              >
                {/* Wheel segments */}
                {segments.map((segment, index) => (
                  <View
                    key={index}
                    style={[
                      styles.segment,
                      {
                        backgroundColor: segment.color,
                        transform: [{ rotate: `${segment.angle}deg` }],
                      },
                    ]}
                  >
                    <Text style={styles.segmentText}>{segment.value}</Text>
                  </View>
                ))}
                
                {/* Center circle */}
                <View style={styles.centerCircle}>
                  <MaterialCommunityIcons name="circle-multiple" size={32} color="#EAB308" />
                </View>
              </Animated.View>

              {/* Pointer */}
              <View style={styles.pointer}>
                <MaterialCommunityIcons name="menu-down" size={40} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Spin Button */}
          <TouchableOpacity
            style={[
              styles.spinButton,
              (!canPlay || isSpinning) && styles.spinButtonDisabled,
            ]}
            onPress={handleSpin}
            disabled={!canPlay || isSpinning}
            activeOpacity={0.8}
          >
            <Text style={styles.spinButtonText}>
              {isSpinning ? 'Rotation...' : canPlay ? 'Tournez la roue' : 'Déjà joué'}
            </Text>
          </TouchableOpacity>

          {/* Win Result */}
          {wonPoints && (
            <View style={styles.winResult}>
              <Text style={styles.winTitle}>Félicitations !</Text>
              <View style={styles.winPoints}>
                <Text style={styles.winPointsText}>+{wonPoints}</Text>
                <MaterialCommunityIcons name="circle-multiple" size={24} color="#EAB308" />
              </View>
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Gagnez jusqu'à 2000 points</Text>
          <Text style={styles.infoDescription}>Tournez la roue pour gagner des points</Text>
        </View>

        {/* Play Status */}
        {!canPlay && (
          <View style={styles.statusCard}>
            <MaterialCommunityIcons name="star" size={24} color="#10B981" />
            <Text style={styles.statusText}>Mission accomplie! Revenez demain.</Text>
          </View>
        )}

        {/* Game Rules */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>Règles du jeu</Text>
          
          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#DBEAFE' }]}>
              <MaterialCommunityIcons name="calendar" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.ruleText}>
              Connectez-vous 7 jours consécutifs pour le grand prix
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#E9D5FF' }]}>
              <MaterialCommunityIcons name="trophy" size={20} color="#A855F7" />
            </View>
            <Text style={styles.ruleText}>
              Les points gagnés sont ajoutés immédiatement à votre solde
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <View style={[styles.ruleIcon, { backgroundColor: '#FEF3C7' }]}>
              <MaterialCommunityIcons name="star" size={20} color="#EAB308" />
            </View>
            <Text style={styles.ruleText}>
              Manquer un jour remet le compteur à zéro
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
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  segment: {
    position: 'absolute',
    width: WHEEL_SIZE / 2,
    height: WHEEL_SIZE / 2,
    top: WHEEL_SIZE / 4,
    left: WHEEL_SIZE / 4,
    transformOrigin: 'center center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  centerCircle: {
    position: 'absolute',
    top: WHEEL_SIZE / 2 - 40,
    left: WHEEL_SIZE / 2 - 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EAB308',
  },
  pointer: {
    position: 'absolute',
    top: -20,
    left: WHEEL_SIZE / 2 - 20,
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
