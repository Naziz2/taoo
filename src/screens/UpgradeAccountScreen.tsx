import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

type PlanType = 'basic' | 'silver' | 'gold';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  priceValue: number;
  color: string;
  bgGradient: string[];
  popular?: boolean;
  benefits: string[];
}

export default function UpgradeAccountScreen() {
  const { t } = useLanguage();
  const { user, setUser } = useUser();
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const currentLevel = (user?.level || 'basic') as PlanType;

  const plans: Plan[] = [
    {
      id: 'basic',
      name: t('upgrade.basic'),
      price: t('upgrade.free'),
      priceValue: 0,
      color: '#6B7280',
      bgGradient: ['#F3F4F6', '#E5E7EB'],
      benefits: [
        t('upgrade.basicBenefit1'),
        t('upgrade.basicBenefit2'),
        t('upgrade.basicBenefit3'),
        t('upgrade.basicBenefit4'),
      ],
    },
    {
      id: 'silver',
      name: t('upgrade.silver'),
      price: '49 SAR',
      priceValue: 49,
      color: '#9CA3AF',
      bgGradient: ['#E5E7EB', '#D1D5DB'],
      popular: true,
      benefits: [
        t('upgrade.silverBenefit1'),
        t('upgrade.silverBenefit2'),
        t('upgrade.silverBenefit3'),
        t('upgrade.silverBenefit4'),
        t('upgrade.silverBenefit5'),
        t('upgrade.silverBenefit6'),
      ],
    },
    {
      id: 'gold',
      name: t('upgrade.gold'),
      price: '99 SAR',
      priceValue: 99,
      color: '#EAB308',
      bgGradient: ['#FEF3C7', '#FDE68A'],
      benefits: [
        t('upgrade.goldBenefit1'),
        t('upgrade.goldBenefit2'),
        t('upgrade.goldBenefit3'),
        t('upgrade.goldBenefit4'),
        t('upgrade.goldBenefit5'),
        t('upgrade.goldBenefit6'),
        t('upgrade.goldBenefit7'),
        t('upgrade.goldBenefit8'),
      ],
    },
  ];

  const handleSelectPlan = (planId: PlanType) => {
    if (planId === currentLevel) return;
    setSelectedPlan(planId);
    setModalVisible(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return;

    setModalVisible(false);

    // Simulate API call
    setTimeout(() => {
      // Update user level
      if (user && setUser) {
        setUser({
          ...user,
          level: selectedPlan,
          monthlyLimit: selectedPlan === 'gold' ? 15000 : selectedPlan === 'silver' ? 7500 : 0,
          maxSplitMonths: selectedPlan === 'gold' ? 12 : selectedPlan === 'silver' ? 6 : 0,
        });
      }

      setSuccessModalVisible(true);

      // Close success modal and navigate back after 2 seconds
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.goBack();
      }, 2000);
    }, 500);
  };

  const PlanCard = ({ plan }: { plan: Plan }) => {
    const isCurrentPlan = plan.id === currentLevel;
    const isLowerPlan = 
      (currentLevel === 'gold' && (plan.id === 'silver' || plan.id === 'basic')) ||
      (currentLevel === 'silver' && plan.id === 'basic');

    return (
      <View style={[styles.planCard, isCurrentPlan && styles.currentPlanCard]}>
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>⭐ {t('upgrade.mostPopular')}</Text>
          </View>
        )}
        
        <View style={[styles.planHeader, { backgroundColor: plan.bgGradient[0] }]}>
          <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.planPrice, { color: plan.color }]}>
              {plan.price}
            </Text>
            {plan.priceValue > 0 && (
              <Text style={styles.planPeriod}>{t('upgrade.month')}</Text>
            )}
          </View>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>{t('upgrade.benefits')}</Text>
          {plan.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={18} 
                color={plan.color} 
                style={styles.checkIcon}
              />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.selectButton,
            { backgroundColor: isCurrentPlan ? '#E5E7EB' : plan.color },
            isLowerPlan && styles.disabledButton,
          ]}
          onPress={() => handleSelectPlan(plan.id)}
          disabled={isCurrentPlan || isLowerPlan}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.selectButtonText,
            isCurrentPlan && styles.currentButtonText,
          ]}>
            {isCurrentPlan ? t('upgrade.currentPlanBtn') : t('upgrade.selectPlan')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('upgrade.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>{t('upgrade.title')}</Text>
          <Text style={styles.pageSubtitle}>{t('upgrade.subtitle')}</Text>
          
          {/* Current Plan Badge */}
          <View style={styles.currentPlanBadge}>
            <MaterialCommunityIcons name="star" size={20} color="#EAB308" />
            <Text style={styles.currentPlanText}>
              {t('upgrade.currentPlan')}: {plans.find(p => p.id === currentLevel)?.name}
            </Text>
          </View>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* Comparison Table */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>{t('upgrade.compareTitle')}</Text>
          
          <View style={styles.comparisonTable}>
            {/* Header */}
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={styles.tableCellTextHeader}>{t('upgrade.feature')}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={styles.tableCellTextHeader}>{t('upgrade.basic')}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={styles.tableCellTextHeader}>{t('upgrade.silver')}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={styles.tableCellTextHeader}>{t('upgrade.gold')}</Text>
              </View>
            </View>

            {/* Rows */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.dealsAccess')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.basicDeals')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.premiumDeals')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.vipDeals')}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.pointsMultiplier')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>1x</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>2x</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>3x</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.splitPayment')}</Text>
              </View>
              <View style={styles.tableCell}>
                <MaterialCommunityIcons name="close" size={16} color="#EF4444" />
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>6 {t('wallet.months')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>12 {t('wallet.months')}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.monthlyLimit')}</Text>
              </View>
              <View style={styles.tableCell}>
                <MaterialCommunityIcons name="close" size={16} color="#EF4444" />
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>7,500</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>15,000</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.support')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.standard')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.priority')}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{t('upgrade.dedicated')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>{t('upgrade.confirmUpgrade')}</Text>
            <Text style={styles.modalMessage}>
              {t('upgrade.confirmMessage')
                .replace('{{plan}}', plans.find(p => p.id === selectedPlan)?.name || '')
                .replace('{{price}}', plans.find(p => p.id === selectedPlan)?.price || '')}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>{t('upgrade.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleConfirmUpgrade}
              >
                <Text style={styles.modalButtonTextConfirm}>{t('upgrade.confirm')}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" />
            <Text style={styles.successTitle}>{t('upgrade.success')}</Text>
            <Text style={styles.successMessage}>
              {t('upgrade.successMessage')
                .replace('{{plan}}', plans.find(p => p.id === selectedPlan)?.name || '')}
            </Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  titleSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  currentPlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  currentPlanText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 6,
  },
  plansContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  currentPlanCard: {
    borderColor: '#EAB308',
    borderWidth: 3,
  },
  popularBadge: {
    backgroundColor: '#EAB308',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planHeader: {
    padding: 24,
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  planPeriod: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  benefitsContainer: {
    padding: 24,
    paddingTop: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  selectButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
    opacity: 0.5,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  currentButtonText: {
    color: '#6B7280',
  },
  comparisonSection: {
    padding: 16,
    marginTop: 16,
  },
  comparisonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  comparisonTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  tableCellHeader: {
    backgroundColor: '#F3F4F6',
  },
  tableCellText: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'center',
  },
  tableCellTextHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#F3F4F6',
  },
  modalButtonConfirm: {
    backgroundColor: '#EAB308',
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  modalButtonTextConfirm: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    maxWidth: 350,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
