import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import CoinIcon from '../components/CoinIcon';

type RewardStatus = 'expired' | 'used' | 'active' | 'pending';

interface Reward {
  id: string;
  title: string;
  description: string;
  discount: string;
  merchant: string;
  code?: string;
  purchaseDate: string;
  expiryDate: string;
  status: RewardStatus;
  imageUrl: string;
}

export default function RewardsListScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<RewardStatus>('expired');

  // Mock data - replace with actual data from your backend
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Offre de Bienvenue',
      description: 'de réduction 15%',
      discount: '15%',
      merchant: 'Kudu',
      purchaseDate: '15/01/2025',
      expiryDate: '15/02/2025',
      status: 'expired',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'Casque Gaming',
      description: 'de réduction 7%',
      discount: '7%',
      merchant: 'Jarir Bookstore',
      code: 'GAMING2025',
      purchaseDate: '10/01/2025',
      expiryDate: '',
      status: 'used',
      imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'Abonnement 1 an',
      description: 'de réduction 20%',
      discount: '20%',
      merchant: 'Fitness Time',
      code: 'GYM2024',
      purchaseDate: '20/12/2024',
      expiryDate: '',
      status: 'used',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    },
    {
      id: '4',
      title: 'Carte Cadeau',
      description: 'de réduction 10%',
      discount: '10%',
      merchant: 'Carrefour',
      code: 'GIFT2025',
      purchaseDate: '05/01/2025',
      expiryDate: '',
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
    },
    {
      id: '5',
      title: 'Smartphone Samsung',
      description: 'de réduction 5%',
      discount: '5%',
      merchant: 'Extra',
      purchaseDate: '28/12/2024',
      expiryDate: '28/02/2025',
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    },
    {
      id: '6',
      title: 'Vêtements Mode',
      description: 'de réduction 25%',
      discount: '25%',
      merchant: 'H&M',
      code: 'FASHION25',
      purchaseDate: '15/12/2024',
      expiryDate: '',
      status: 'used',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    },
  ];

  const tabs: { key: RewardStatus; label: string; count: number }[] = [
    { key: 'expired', label: 'Expirés', count: rewards.filter(r => r.status === 'expired').length },
    { key: 'used', label: 'Utilisés', count: rewards.filter(r => r.status === 'used').length },
    { key: 'active', label: 'Actifs', count: rewards.filter(r => r.status === 'active').length },
    { key: 'pending', label: 'En attente', count: 0 },
  ];

  const filteredRewards = rewards.filter(r => r.status === activeTab);

  const getStatusColor = (status: RewardStatus) => {
    switch (status) {
      case 'expired': return '#EF4444';
      case 'used': return '#3B82F6';
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: RewardStatus) => {
    switch (status) {
      case 'expired': return 'Expiré';
      case 'used': return 'Utilisé';
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      default: return '';
    }
  };

  const stats = [
    { label: 'Total', value: rewards.length, color: '#6B7280' },
    { label: 'Bons utilisés', value: rewards.filter(r => r.status === 'used').length, color: '#3B82F6' },
    { label: 'Bons actifs', value: rewards.filter(r => r.status === 'active').length, color: '#10B981' },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.logo}>TAOO</Text>

        <TouchableOpacity style={styles.pointsContainer}>
          <CoinIcon size={16} />
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '13,614'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.activeTabLabel,
                ]}>
                  {tab.label} ({tab.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.tabIndicator} />
        </View>

        {/* Rewards List */}
        <View style={styles.rewardsList}>
          {filteredRewards.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="ticket-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Aucun bon {getStatusLabel(activeTab).toLowerCase()}</Text>
            </View>
          ) : (
            filteredRewards.map((reward) => (
              <View key={reward.id} style={styles.rewardCard}>
                <View style={styles.rewardHeader}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(reward.status) + '20' }
                  ]}>
                    <MaterialCommunityIcons 
                      name={reward.status === 'expired' ? 'clock-outline' : 'check-circle-outline'} 
                      size={14} 
                      color={getStatusColor(reward.status)} 
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(reward.status) }]}>
                      {getStatusLabel(reward.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.rewardContent}>
                  <Image 
                    source={{ uri: reward.imageUrl }}
                    style={styles.rewardImage}
                    resizeMode="cover"
                  />
                  
                  <View style={styles.rewardInfo}>
                    <Text style={styles.rewardTitle}>{reward.title}</Text>
                    <Text style={styles.rewardDiscount}>{reward.description}</Text>
                    <Text style={styles.rewardMerchant}>•{reward.merchant}</Text>
                    
                    {reward.code && (
                      <View style={styles.codeContainer}>
                        <Text style={styles.codeLabel}>Code: </Text>
                        <Text style={styles.codeValue}>{reward.code}</Text>
                      </View>
                    )}
                    
                    <Text style={styles.rewardDate}>
                      {reward.status === 'expired' 
                        ? `Expiré le ${reward.expiryDate}`
                        : `Acheté le ${reward.purchaseDate}`
                      }
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Conseils d'utilisation 💡</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>
              • Présentez le QR code en magasin pour utiliser votre bon
            </Text>
            <Text style={styles.tipText}>
              • Vérifiez les conditions d'utilisation avant de vous rendre
            </Text>
            <Text style={styles.tipText}>
              • Les bons ont une date d'expiration, utilisez-les à temps
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 2,
  },
  pointsContainer: {
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
    color: '#92400E',
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#EAB308',
  },
  tabLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#111827',
    fontWeight: '600',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  rewardsList: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rewardHeader: {
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rewardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  rewardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  rewardDiscount: {
    fontSize: 14,
    color: '#EAB308',
    fontWeight: '500',
    marginBottom: 2,
  },
  rewardMerchant: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  codeLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  codeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  rewardDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statsSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  tipsSection: {
    padding: 16,
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
});
