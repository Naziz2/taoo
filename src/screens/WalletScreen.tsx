import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

type WalletScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function WalletScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [showPointsInfo, setShowPointsInfo] = useState(false);

  const userLevel = user?.level || 'basic';
  const monthlyLimit = user?.monthlyLimit || 7500;
  const usedThisMonth = user?.usedThisMonth || 2440;
  const availableLimit = monthlyLimit - usedThisMonth;
  const limitPercentage = (usedThisMonth / monthlyLimit) * 100;
  const maxSplitMonths = user?.maxSplitMonths || 6;

  const quickActions = [
    { 
      icon: 'qrcode-scan', 
      label: t('wallet.scanOrder') || 'Scanner QR', 
      color: '#EAB308',
      action: () => navigation.navigate('QRScanner')
    },
    { 
      icon: 'receipt', 
      label: t('wallet.uploadReceipt') || 'Télécharger Reçu', 
      color: '#EAB308',
      action: () => navigation.navigate('ReceiptUpload')
    },
    { 
      icon: 'gift', 
      label: t('wallet.redeem') || 'Échanger', 
      color: '#EAB308',
      action: () => navigation.navigate('RewardsList')
    },
    { 
      icon: 'credit-card', 
      label: t('wallet.flouciPay') || 'Payer avec Flouci', 
      color: '#EAB308',
      action: () => navigation.navigate('FlouciPayment')
    },
  ];

  const recentActivity = [
    { type: 'earned', merchant: 'H&M', points: 25, date: '2024-01-15' },
    { type: 'redeemed', merchant: 'Gift Card', points: -500, date: '2024-01-12' },
    { type: 'earned', merchant: 'TunisiaNet', points: 80, date: '2024-01-10' },
  ];

  const earningInfo = [
    { label: 'Shop at partner stores', value: '10 pts/SAR' },
    { label: 'Refer friends', value: '50 points' },
    { label: 'Daily check-in', value: '15 points' },
    { label: 'Mobile subscription', value: '10.50 SAR/month' },
  ];

  const formatCurrency = (amount: number) => {
    return `${(amount / 100).toFixed(2)} SAR`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialCommunityIcons name="account" color="#6B7280" size={24} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/taoo_black 1.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <Image 
            source={require('../../assets/coin-icon.png')} 
            style={styles.coinIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>{t('wallet.title') || 'Wallet'}</Text>
        </View>

        {/* Points Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>
                {t('wallet.availablePoints') || 'Available Points'}
              </Text>
              <Text style={styles.balanceAmount}>{user?.points?.toLocaleString() || '0'}</Text>
              <View style={styles.estimateRow}>
                <Text style={styles.estimateText}>
                  {t('wallet.estimated') || 'Estimated'} {formatCurrency(user?.points || 0)}
                </Text>
                <TouchableOpacity onPress={() => setShowPointsInfo(true)}>
                  <Text style={styles.readMoreText}>{t('wallet.readMore') || 'Read more'} »</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image 
              source={require('../../assets/coin-icon.png')} 
              style={styles.coinBig}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.earnDesc}>
            {t('wallet.earnPointsDesc') || 'Earn points with every purchase at our partner stores!'}
          </Text>
        </View>

        {/* Monthly Spending Limit */}
        {userLevel !== 'basic' ? (
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <Text style={styles.limitTitle}>
                {t('wallet.monthlyLimit') || 'Monthly Spending Limit'}
              </Text>
              <MaterialCommunityIcons name="trending-up" size={24} color="#3B82F6" />
            </View>
            <View style={styles.limitProgress}>
              <View style={styles.limitTextRow}>
                <Text style={styles.limitText}>{t('wallet.usedThisMonth') || 'Used this month'}</Text>
                <Text style={styles.limitText}>
                  {usedThisMonth} / {monthlyLimit} SAR
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${limitPercentage}%` }]} />
              </View>
            </View>
            <View style={styles.limitStats}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{availableLimit}</Text>
                <Text style={styles.statLabel}>{t('wallet.available') || 'Available'}</Text>
              </View>
              <View style={[styles.statBox, styles.statBoxBlue]}>
                <Text style={styles.statValueBlue}>{maxSplitMonths}</Text>
                <Text style={styles.statLabelBlue}>{t('wallet.maxSplit') || 'Max Split'}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.limitCard}>
            <View style={styles.limitHeader}>
              <Text style={styles.limitTitle}>
                {t('wallet.monthlyLimit') || 'Monthly Spending Limit'}
              </Text>
              <MaterialCommunityIcons name="trending-up" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.basicWarning}>
              {t('wallet.splitNotAvailable')}
            </Text>
            <TouchableOpacity 
              style={styles.upgradeButtonWallet}
              onPress={() => navigation.navigate('UpgradeAccount')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="star" color="#FFFFFF" size={20} />
              <Text style={styles.upgradeButtonTextWallet}>{t('account.upgrade')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>{t('wallet.quickActions') || 'Actions Rapides'}</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionItem}
                onPress={action.action}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <MaterialCommunityIcons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>{t('wallet.recentActivity')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityLeft}>
                  <View
                    style={[
                      styles.activityIconCircle,
                      activity.type === 'earned' ? styles.earnedBg : styles.redeemedBg,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={activity.type === 'earned' ? 'plus' : 'minus'}
                      size={20}
                      color={activity.type === 'earned' ? '#10B981' : '#EF4444'}
                    />
                  </View>
                  <View>
                    <Text style={styles.activityMerchant}>{activity.merchant}</Text>
                    <Text style={styles.activityDate}>{activity.date}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.activityPoints,
                    activity.type === 'earned' ? styles.earnedText : styles.redeemedText,
                  ]}
                >
                  {activity.points > 0 ? '+' : ''}
                  {activity.points}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* How to Earn Points */}
        <View style={styles.earnCard}>
          <Text style={styles.earnTitle}>How to Earn More Points</Text>
          <View style={styles.earnList}>
            {earningInfo.map((info, index) => (
              <View key={index} style={styles.earnItem}>
                <Text style={styles.earnLabel}>• {info.label}</Text>
                <Text style={styles.earnValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Points Info Modal */}
      <Modal visible={showPointsInfo} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Points Information</Text>
            <Text style={styles.modalText}>
              Your points are converted to SAR at a rate of 1 point = 0.01 SAR. Use your points to redeem
              gift cards, vouchers, and exclusive deals from our partner stores!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPointsInfo(false)}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EAB308',
  },
  logo: {
    height: 28,
    width: 120,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 4,
  },
  coinIcon: {
    width: 16,
    height: 16,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  balanceCard: {
    backgroundColor: '#EAB308',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 24,
    borderRadius: 12,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  estimateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimateText: {
    fontSize: 14,
    color: '#374151',
    opacity: 0.8,
  },
  readMoreText: {
    fontSize: 14,
    color: '#111827',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  coinBig: {
    width: 60,
    height: 60,
  },
  earnDesc: {
    fontSize: 14,
    color: '#374151',
    opacity: 0.8,
  },
  limitCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  limitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  limitProgress: {
    marginBottom: 16,
  },
  limitTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  limitText: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  limitStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statBoxBlue: {
    backgroundColor: '#DBEAFE',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statValueBlue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#10B981',
  },
  statLabelBlue: {
    fontSize: 14,
    color: '#3B82F6',
  },
  basicWarning: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  upgradeButtonWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  upgradeButtonTextWallet: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FEF3C7',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedBg: {
    backgroundColor: '#DCFCE7',
  },
  redeemedBg: {
    backgroundColor: '#FEE2E2',
  },
  activityMerchant: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  earnedText: {
    color: '#10B981',
  },
  redeemedText: {
    color: '#EF4444',
  },
  earnCard: {
    backgroundColor: '#DBEAFE',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  earnTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  earnList: {
    gap: 8,
  },
  earnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earnLabel: {
    fontSize: 14,
    color: '#1E3A8A',
  },
  earnValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E3A8A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#EAB308',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});
