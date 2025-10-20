import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import PromotionCard from '../components/PromotionCard';
import GiftCard from '../components/GiftCard';
import PartnerStore from '../components/PartnerStore';
import DailyRewardsWheel from '../components/DailyRewardsWheel';
import type { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  const partners = [
    { name: 'Jarir', logo: 'JR', bgColor: '#FF6B35' },
    { name: 'eXtra', logo: 'EX', bgColor: '#EC4899' },
    { name: 'Al Baik', logo: 'AB', bgColor: '#EF4444' },
    { name: 'Centrepoint', logo: 'CP', bgColor: '#2563EB' },
  ];

  const sampleDeals = {
    fashionSale: {
      thumbnail: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      discount: 'Up to 50% off',
    },
    summerSale: {
      thumbnail: 'https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/468068063_10169935301505486_5007459974403657300_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=UPDH2rdpW7gQ7kNvwFfW3Xr&_nc_oc=AdnkvKx8eNp_hQVkIHBX8w9ZmevCXLDRPdGOZhZrJpEe_TBGGqwYKeTZTx03LsKAg2A&_nc_zt=23&_nc_ht=scontent.ftun14-1.fna&_nc_gid=MDeO69tZxufuZn6NdEqwTg&oh=00_AfU-79k8BcrPsCV3j0o6vnExSXdzh_8zm7Ws4wfENr5qPQ&oe=68A0F51B',
      discount: 'Up to 70% off',
    },
    giftCard50: {
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/repas%20cheque%20maroc.jpg.webp?itok=LFKLaX2e',
      amount: '50TND',
      points: 490,
      quantity: 300,
    },
    giftCard100: {
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk',
      amount: '100TND',
      points: 990,
      quantity: 400,
    },
    parisTrip: {
      thumbnail: 'https://image.resabooking.com/images/images_og/img_p_hotel_og_1065.jpg',
      points: 19560,
      title: '7 Jours à Istanbul',
    },
    geantPromo: {
      thumbnail: 'https://www.tunisianet.com.tn/modules/wbimageslider/views/img/b610ae3f3b20262c0c936625ac3d38834d6f8a3f_tv%20samsung%20promo.jpg',
      price: '799DT',
    },
  };

  const handleAccountPress = () => {
    navigation.navigate('Account');
  };

  const handlePointsPress = () => {
    navigation.navigate('Wallet');
  };

  const handleDailyRewards = () => {
    navigation.navigate('DailyRewards');
  };

  const handlePromotionPress = (title: string) => {
    navigation.navigate('Deals');
  };

  const handlePartnerPress = (partnerName: string) => {
    navigation.navigate('Stores');
  };

  const handleGiftCardPress = (amount: string) => {
    Alert.alert(
      t('home.giftCardTitle'),
      t('home.giftCardRedeem').replace('{{amount}}', amount),
      [
        { text: t('home.cancel'), style: 'cancel' },
        { text: t('home.confirm'), onPress: () => Alert.alert(t('home.success'), t('home.giftCardRedeemed')) },
      ]
    );
  };

  const handlePremiumOfferPress = () => {
    Alert.alert(
      t('home.premiumOfferTitle'),
      t('home.premiumOfferDesc').replace('{{title}}', sampleDeals.parisTrip.title).replace('{{points}}', sampleDeals.parisTrip.points.toString()),
      [
        { text: t('home.cancel'), style: 'cancel' },
        { text: t('home.viewDetails'), onPress: () => navigation.navigate('Deals') },
      ]
    );
  };

  const handleGeantPromoPress = () => {
    Alert.alert(
      t('home.specialPromotion'),
      t('home.specialPromoDesc').replace('{{title}}', `TV Samsung ${sampleDeals.geantPromo.price}`),
      [
        { text: t('home.cancel'), style: 'cancel' },
        { text: t('home.viewStore'), onPress: () => navigation.navigate('Stores') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleAccountPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="account" color="#6B7280" size={24} />
        </TouchableOpacity>

        <Text style={styles.logo}>DO SHOPPING</Text>

        <TouchableOpacity 
          style={styles.pointsContainer}
          onPress={handlePointsPress}
          activeOpacity={0.7}
        >
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <Text style={styles.coinIcon}>🪙</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" color="#9CA3AF" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('header.search') || 'Search stores, deals...'}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Daily Rewards Wheel */}
        <DailyRewardsWheel 
          onPointsWon={(points) => {
            console.log(`User won ${points} points!`);
          }}
        />

        {/* Promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.promotions')}</Text>
          <View style={styles.promotionsGrid}>
            <TouchableOpacity 
              style={styles.promotionItem}
              onPress={() => handlePromotionPress('Fashion Sale')}
              activeOpacity={0.8}
            >
              <PromotionCard
                title="Fashion Sale"
                thumbnail={sampleDeals.fashionSale.thumbnail}
                discount={sampleDeals.fashionSale.discount}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.promotionItem}
              onPress={() => handlePromotionPress('Summer Sale')}
              activeOpacity={0.8}
            >
              <PromotionCard
                title="Summer Sale"
                thumbnail={sampleDeals.summerSale.thumbnail}
                discount={sampleDeals.summerSale.discount}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Partner Stores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.partnerStores')}</Text>
          <View style={styles.partnersGrid}>
            {partners.map((partner) => (
              <TouchableOpacity 
                key={partner.name}
                onPress={() => handlePartnerPress(partner.name)}
                activeOpacity={0.7}
              >
                <PartnerStore
                  name={partner.name}
                  logo={partner.logo}
                  bgColor={partner.bgColor}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Earn Points Banner */}
        <View style={styles.earnPointsBanner}>
          <Text style={styles.earnPointsTitle}>{t('home.earnPoints')}</Text>
          <Text style={styles.earnPointsText}>
            {t('home.earnPointsDesc') || 'Shop at partner stores and earn points with every purchase'}
          </Text>
        </View>

        {/* Gift Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.giftCards')}</Text>
          <View style={styles.giftCardsGrid}>
            <TouchableOpacity 
              style={styles.giftCardItem}
              onPress={() => handleGiftCardPress(sampleDeals.giftCard50.amount)}
              activeOpacity={0.8}
            >
              <GiftCard
                thumbnail={sampleDeals.giftCard50.thumbnail}
                amount={sampleDeals.giftCard50.amount}
                points={sampleDeals.giftCard50.points}
                quantity={sampleDeals.giftCard50.quantity}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.giftCardItem}
              onPress={() => handleGiftCardPress(sampleDeals.giftCard100.amount)}
              activeOpacity={0.8}
            >
              <GiftCard
                thumbnail={sampleDeals.giftCard100.thumbnail}
                amount={sampleDeals.giftCard100.amount}
                points={sampleDeals.giftCard100.points}
                quantity={sampleDeals.giftCard100.quantity}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.premiumOffers')}</Text>
          <TouchableOpacity 
            style={styles.premiumOffer}
            onPress={handlePremiumOfferPress}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={{ uri: sampleDeals.parisTrip.thumbnail }}
              style={styles.premiumOfferBackground}
              imageStyle={styles.premiumOfferImage}
            >
              <View style={styles.premiumOfferOverlay}>
                <View style={styles.premiumOfferHeader}>
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityBadgeText}>{t('home.quantity')}: 2</Text>
                  </View>
                  <View style={styles.premiumPoints}>
                    <Text style={styles.premiumPointsText}>{sampleDeals.parisTrip.points}</Text>
                    <Text style={styles.coinIcon}>🪙</Text>
                  </View>
                </View>
                <View style={styles.premiumOfferFooter}>
                  <Text style={styles.premiumOfferTitle}>{sampleDeals.parisTrip.title}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Geant Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.geantSelection') || 'Best Selection'}</Text>
          <TouchableOpacity 
            style={styles.geantPromo}
            onPress={handleGeantPromoPress}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={{ uri: sampleDeals.geantPromo.thumbnail }}
              style={styles.geantPromoBackground}
              imageStyle={styles.geantPromoImage}
            >
              <View style={styles.geantPriceBadge}>
                <Text style={styles.geantPriceText}>{sampleDeals.geantPromo.price}</Text>
              </View>
              <View style={styles.geantPromoFooter}>
                <Text style={styles.geantPromoTitle}>{t('home.promotion') || 'Special Promotion'}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 80 }} />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAB308',
    letterSpacing: 1,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  coinIcon: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
    paddingVertical: 0,
    height: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  promotionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  promotionItem: {
    flex: 1,
  },
  partnersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earnPointsBanner: {
    backgroundColor: '#EAB308',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  earnPointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  earnPointsText: {
    fontSize: 14,
    color: '#374151',
  },
  giftCardsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  giftCardItem: {
    flex: 1,
  },
  premiumOffer: {
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
  },
  premiumOfferBackground: {
    flex: 1,
  },
  premiumOfferImage: {
    borderRadius: 12,
  },
  premiumOfferOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    justifyContent: 'space-between',
  },
  premiumOfferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityBadgeText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '600',
  },
  premiumPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 4,
  },
  premiumOfferFooter: {
    alignItems: 'flex-start',
  },
  premiumOfferTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  geantPromo: {
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
  },
  geantPromoBackground: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  geantPromoImage: {
    borderRadius: 12,
  },
  geantPriceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  geantPriceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  geantPromoFooter: {
    alignItems: 'flex-start',
  },
  geantPromoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
