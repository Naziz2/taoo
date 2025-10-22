import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CoinIcon from '../components/CoinIcon';
import { useLanguage } from '../contexts/LanguageContext';

export default function DealDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { deal } = route.params || { deal: null };
  const [isPurchasing, setIsPurchasing] = useState(false);

  if (!deal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('dealDetail.offer')}</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('dealDetail.unavailable')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getDiscountText = () => {
    if (deal.discountType === 'PERCENT' && deal.discountPercentAmount > 0) {
      return `réduction ${deal.discountPercentAmount}%`;
    } else if (deal.discountType === 'MONEY' && deal.discountMoneyAmount > 0) {
      return `réduction ${deal.discountMoneyAmount}DT`;
    }
    return 'Offre spéciale';
  };

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      Alert.alert('Succès', 'Offre achetée avec succès!');
      navigation.goBack();
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('dealDetail.title')}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Banner with Points and Discount Badge */}
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={{ uri: deal.thumbnail }} 
            style={styles.imageBackground}
            imageStyle={styles.image}
          >
            <View style={styles.imageBadges}>
              <View style={styles.pointsBadge}>
                <CoinIcon size={16} />
                <Text style={styles.pointsText}>{deal.pointSellPrice}</Text>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>{getDiscountText()}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🍽️</Text>
          </View>
          <Text style={styles.mainTitle}>{deal.title}</Text>
          <Text style={styles.companyName}>{deal.companies?.[0]?.name || 'Partner'}</Text>
          <Text style={styles.offerNumber}>Offre numéro {deal.id}</Text>
        </View>

        {/* Status Grid */}
        <View style={styles.statusGrid}>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <View style={styles.statusLabel}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#D97706" />
                <Text style={styles.statusLabelText}>Expire</Text>
              </View>
              <Text style={styles.statusValueOrange}>2025-09-30</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={styles.statusLabel}>
                <MaterialCommunityIcons name="check-circle" size={16} color="#059669" />
                <Text style={styles.statusLabelText}>Stock</Text>
              </View>
              <Text style={styles.statusValueGreen}>En stock</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabelText}>Temps restant</Text>
              <Text style={styles.statusValueOrange}>871 13:54:42</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabelText}>Votre obtenue</Text>
              <Text style={styles.statusValueBlack}>réduction</Text>
            </View>
          </View>
        </View>

        {/* Additional Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Plus d'informations</Text>
            <MaterialCommunityIcons name="information-outline" size={18} color="#6B7280" />
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>en stock {deal.remainCount}</Text>
            <Text style={styles.infoValue}>Quantité en stock</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('dealDetail.daysCount', { count: 7 })}</Text>
            <Text style={styles.infoValue}>Validité du bon</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>coupons {deal.count}</Text>
            <Text style={styles.infoValue}>Stock disponible</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>coupon(s) 0</Text>
            <Text style={styles.infoValue}>Disponible pour vous</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabelRed}>Non</Text>
            <Text style={styles.infoValue}>Cadeau</Text>
            <Text style={styles.infoLabelRed}>Non</Text>
            <Text style={styles.infoValue}>Partageable</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <MaterialCommunityIcons name="information-outline" size={18} color="#6B7280" />
          </View>
          <Text style={styles.descriptionText}>
            Profitez de cette offre exclusive chez {deal.companies?.[0]?.name}. {deal.title}
          </Text>
        </View>

        {/* Usage Conditions */}
        <View style={styles.conditionsBox}>
          <Text style={styles.conditionsTitle}>Conditions d'utilisation</Text>
          <View style={styles.conditionItem}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#3B82F6" />
            <Text style={styles.conditionText}>Offre valable uniquement pour les nouveaux clients</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#3B82F6" />
            <Text style={styles.conditionText}>Non cumulable avec d'autres promotions</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#3B82F6" />
            <Text style={styles.conditionText}>Valable dans tous les restaurants de la chaîne</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#3B82F6" />
            <Text style={styles.conditionText}>{t('dealDetail.voucherValidity', { count: 7 })}</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingTitle}>Évaluation</Text>
            <MaterialCommunityIcons name="star" size={18} color="#EAB308" />
          </View>
          <View style={styles.ratingContent}>
            <Text style={styles.reviewCount}>avis 34</Text>
            <View style={styles.starsContainer}>
              <Text style={styles.ratingScore}>4.8/5</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialCommunityIcons key={star} name="star" size={16} color="#EAB308" />
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Purchase Button */}
      <View style={[styles.purchaseContainer, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity 
          style={[styles.purchaseButton, isPurchasing && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={isPurchasing}
        >
          <Text style={styles.purchaseButtonText}>
            {isPurchasing ? 'Achat en cours...' : `Acheter pour ${deal.pointSellPrice} points`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 16, 
    paddingBottom: 12,
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB' 
  },
  backButton: { 
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 220,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  image: {
    borderRadius: 0,
  },
  imageBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  discountBadge: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  titleSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#EAB308',
  },
  iconEmoji: {
    fontSize: 32,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 4,
  },
  offerNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusGrid: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusLabelText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusValueOrange: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D97706',
  },
  statusValueGreen: {
    fontSize: 15,
    fontWeight: '600',
    color: '#059669',
  },
  statusValueBlack: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  infoLabelRed: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  conditionsBox: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  conditionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  conditionText: {
    fontSize: 13,
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  ratingSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
  },
  ratingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  purchaseContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  purchaseButton: {
    backgroundColor: '#EAB308',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#FDE68A',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});
