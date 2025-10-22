import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import DealCard from '../components/DealCard';
import CoinIcon from '../components/CoinIcon';

type DealsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Deal {
  id: number;
  title: string;
  companies: Array<{ id: number; name: string; logo: string }>;
  discountPercentAmount: number;
  discountMoneyAmount: number;
  pointSellPrice: number;
  count: number;
  remainCount: number;
  premium: boolean;
  vip: boolean;
  background: string;
  textColor: string;
  titleColor: string;
  thumbnail: string;
  discountType: 'PERCENT' | 'MONEY';
}

export default function DealsScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const userLevel = user?.level || 'basic';

  const handleUpgradePress = () => {
    console.log('Upgrade pressed from deals');
    navigation.navigate('UpgradeAccount');
  };

  const dealsData: Deal[] = [
    {
      id: 12,
      title: "Offre de Bienvenue",
      companies: [{ id: 4, name: "Friends Pasta Bar", logo: "" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 35,
      count: 8,
      remainCount: 6,
      premium: false,
      vip: false,
      background: "#53693f",
      textColor: "#002e0b",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/e068eb2f-b59f-44f7-821c-867540fe1d3d",
      discountType: "PERCENT",
    },
    {
      id: 23,
      title: "Enfants moins de 13 ans",
      companies: [{ id: 7, name: "Urban Dance", logo: "" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 140,
      count: 11,
      remainCount: 6,
      premium: true,
      vip: false,
      background: "#67568f",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/aabb4015-262e-4b77-8a8d-b385c3bc734d",
      discountType: "PERCENT",
    },
    {
      id: 214,
      title: "Promotion de -15% sur les jouets",
      companies: [{ id: 12, name: "Edito", logo: "" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 45,
      count: 25,
      remainCount: 16,
      premium: true,
      vip: false,
      background: "#f2a069",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/f31299e5-144c-430a-b767-e8e1bd87e626",
      discountType: "PERCENT",
    },
    {
      id: 102,
      title: "Location Ring Toss",
      companies: [{ id: 13, name: "Moons", logo: "" }],
      discountPercentAmount: 0.0,
      discountMoneyAmount: 60.0,
      pointSellPrice: 75,
      count: 18,
      remainCount: 16,
      premium: true,
      vip: false,
      background: "#232323",
      textColor: "#d58400",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/53675b42-5253-4bb1-b98e-ede5c610138b",
      discountType: "MONEY",
    },
    {
      id: 29,
      title: "-25% Bienvenue chez LEGO Create",
      companies: [{ id: 10, name: "LEGO Create", logo: "" }],
      discountPercentAmount: 25.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 20,
      count: 4,
      remainCount: 3,
      premium: true,
      vip: false,
      background: "#d7d0ac",
      textColor: "#000000",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/ebc2ec88-e89a-4d85-b89f-659005059698",
      discountType: "PERCENT",
    },
    {
      id: 88,
      title: "Offre Milieu de Semaine",
      companies: [{ id: 22, name: "Flamingo Forest Parcours Aventure", logo: "" }],
      discountPercentAmount: 20.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 60,
      count: 25,
      remainCount: 16,
      premium: true,
      vip: false,
      background: "#9ca979",
      textColor: "#ffffff",
      titleColor: "#fec700",
      thumbnail: "https://server.taoo.ai/api/uploads/2d05b7e5-a681-471a-8d3f-185b3f68348b",
      discountType: "PERCENT",
    },
    {
      id: 66,
      title: "Achat de deux paires -50% sur la deuxième paire",
      companies: [{ id: 20, name: "Desa Optic", logo: "" }],
      discountPercentAmount: 50.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 110,
      count: 23,
      remainCount: 16,
      premium: true,
      vip: true,
      background: "#ffee60",
      textColor: "#000000",
      titleColor: "#b03703",
      thumbnail: "https://server.taoo.ai/api/uploads/59225c9f-9a88-4caa-84bc-db890f938c14",
      discountType: "PERCENT",
    },
    {
      id: 44,
      title: "-10% sur les fondants et gâteaux délicieux",
      companies: [{ id: 14, name: "Mikui", logo: "" }],
      discountPercentAmount: 10.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 25,
      count: 69,
      remainCount: 66,
      premium: true,
      vip: false,
      background: "#a1bac0",
      textColor: "#ffffff",
      titleColor: "#24292a",
      thumbnail: "https://server.taoo.ai/api/uploads/d3673ba3-1c86-49bb-9e9b-cd502161b72d",
      discountType: "PERCENT",
    },
    {
      id: 167,
      title: "Abonnement 1 an",
      companies: [{ id: 38, name: "Arena Gym Premium", logo: "" }],
      discountPercentAmount: 50.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 80,
      count: 66,
      remainCount: 66,
      premium: true,
      vip: true,
      background: "#712187",
      textColor: "#ebebeb",
      titleColor: "#f0c413",
      thumbnail: "https://server.taoo.ai/api/uploads/03e5d887-cc21-472e-8d03-9a2ce56b1521",
      discountType: "PERCENT",
    },
    {
      id: 6,
      title: "Bienvenue à Eye Glow",
      companies: [{ id: 5, name: "Eye Glow Optic", logo: "" }],
      discountPercentAmount: 25.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 100,
      count: 37,
      remainCount: 26,
      premium: true,
      vip: false,
      background: "#0b1d7d",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/17b3e31e-7324-4c8b-8ed4-371395f13c2e",
      discountType: "PERCENT",
    },
    {
      id: 83,
      title: "Casque Gaming",
      companies: [{ id: 21, name: "SkyMil informatique", logo: "" }],
      discountPercentAmount: 7.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 80,
      count: 0,
      remainCount: 0,
      premium: true,
      vip: false,
      background: "#6c0e13",
      textColor: "#000000",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/f2c221b8-dcff-4c0b-b7e3-1b025db7a2d8",
      discountType: "PERCENT",
    },
    {
      id: 118,
      title: "Machine à laver reconditionnée",
      companies: [{ id: 25, name: "WeFix", logo: "" }],
      discountPercentAmount: 10.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 70,
      count: 0,
      remainCount: 0,
      premium: true,
      vip: false,
      background: "#d8dfd9",
      textColor: "#059b39",
      titleColor: "#444444",
      thumbnail: "https://server.taoo.ai/api/uploads/9d09ce90-d19b-4613-bb3d-6cffae37853b",
      discountType: "PERCENT",
    },
  ];

  const getDiscountText = (deal: Deal) => {
    if (deal.discountType === 'PERCENT' && deal.discountPercentAmount > 0) {
      return t('deals.discountPercent', { percent: deal.discountPercentAmount });
    } else if (deal.discountType === 'MONEY' && deal.discountMoneyAmount > 0) {
      return t('deals.discountMoney', { amount: deal.discountMoneyAmount });
    }
    return t('deals.specialOffer');
  };

  const canAccessPremium = userLevel === 'silver' || userLevel === 'gold';
  const canAccessVip = userLevel === 'gold';

  const isLocked = (deal: Deal) => {
    if (deal.vip && !canAccessVip) return true;
    if (deal.premium && !canAccessPremium) return true;
    return false;
  };

  const restaurantDeals = dealsData.filter(deal => 
    ['Friends Pasta Bar', 'Mikui'].includes(deal.companies[0]?.name)
  );

  const sportDeals = dealsData.filter(deal => 
    ['Urban Dance', 'Flamingo Forest Parcours Aventure', 'Arena Gym Premium'].includes(deal.companies[0]?.name)
  );

  const opticDeals = dealsData.filter(deal => 
    ['Desa Optic', 'Eye Glow Optic'].includes(deal.companies[0]?.name)
  );

  const techDeals = dealsData.filter(deal => 
    ['SkyMil informatique', 'WeFix'].includes(deal.companies[0]?.name)
  );

  const educationDeals = dealsData.filter(deal => 
    ['LEGO Create', 'Edito'].includes(deal.companies[0]?.name)
  );

  const entertainmentDeals = dealsData.filter(deal => 
    ['Moons'].includes(deal.companies[0]?.name)
  );

  const DealSection = ({ title, deals, emoji }: { title: string; deals: Deal[]; emoji: string }) => {
    if (deals.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {title} {emoji}
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{t('deals.viewAll')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dealsGrid}>
          {deals.slice(0, 4).map((deal) => (
            <View key={deal.id} style={styles.dealItem}>
              <DealCard
                title={deal.title}
                company={deal.companies[0]?.name || 'Partner'}
                discount={getDiscountText(deal)}
                points={deal.pointSellPrice}
                thumbnail={deal.thumbnail}
                background={deal.background}
                titleColor={deal.titleColor}
                textColor={deal.textColor}
                premium={deal.premium}
                vip={deal.vip}
                locked={isLocked(deal)}
                tier={deal.vip ? 'vip' : deal.premium ? 'premium' : 'basic'}
                onPress={() => {
                  if (!isLocked(deal)) {
                    navigation.navigate('DealDetail', { deal });
                  }
                }}
                onUpgradePress={isLocked(deal) ? handleUpgradePress : undefined}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={[styles.profileButton, { marginTop: 0 }]}
          onPress={() => navigation.navigate('Account')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="account" color="#6B7280" size={24} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/taoo_black 1.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity 
          style={styles.pointsContainer}
          onPress={() => navigation.navigate('Wallet')}
          activeOpacity={0.8}
        >
          <View style={styles.pointsGlow} />
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <CoinIcon size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {userLevel === 'basic' && (
          <View style={styles.upgradeBanner}>
            <View style={styles.upgradeContent}>
              <Text style={styles.upgradeTitle}>{t('deals.upgradeTitle')}</Text>
              <Text style={styles.upgradeText}>
                {t('deals.upgradeDesc')}
              </Text>
              <View style={styles.upgradeInfo}>
                <View style={styles.currentLevelBadge}>
                  <Text style={styles.currentLevelText}>{t('deals.currentLevel')}</Text>
                </View>
                <Text style={styles.arrowText}>{t('deals.targetLevel')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradePress}>
              <Text style={styles.upgradeButtonText}>{t('deals.upgradeNow')}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.featuredSectionTitle}>{t('deals.featured')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>{t('deals.viewAll')}</Text>
            </TouchableOpacity>
          </View>
          {dealsData.length > 0 && (
            <TouchableOpacity 
              style={styles.featuredDeal}
              onPress={() => {
                if (!isLocked(dealsData[0])) {
                  navigation.navigate('DealDetail', { deal: dealsData[0] });
                }
              }}
            >
              <ImageBackground
                source={{ uri: dealsData[0].thumbnail }}
                style={styles.featuredDealContent}
                imageStyle={{ borderRadius: 16 }}
              >
                <View style={styles.featuredDealOverlay}>
                  <View style={styles.featuredDealTop}>
                    <View style={styles.featuredBadgeContainer}>
                      <View style={styles.featuredPointsBadge}>
                        <Text style={styles.featuredPointsText}>{dealsData[0].pointSellPrice} pts</Text>
                      </View>
                      {dealsData[0].premium && (
                        <View style={[styles.premiumBadge, { backgroundColor: dealsData[0].vip ? '#FFD700' : '#C0C0C0' }]}>
                          <Text style={styles.premiumBadgeText}>{dealsData[0].vip ? 'VIP' : 'PREMIUM'}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.featuredContent}>
                    <Text style={[styles.featuredCompany, { color: dealsData[0].textColor }]}>
                      {dealsData[0].companies[0]?.name}
                    </Text>
                    <Text style={[styles.featuredTitle, { color: dealsData[0].titleColor }]}>
                      {dealsData[0].title}
                    </Text>
                    <Text style={[styles.featuredDiscount, { color: dealsData[0].textColor }]}>
                      {getDiscountText(dealsData[0])}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        </View>

        <DealSection title={t('deals.restaurantsGastronomy')} deals={restaurantDeals} emoji="🍽️" />
        <DealSection title={t('deals.sportFitness')} deals={sportDeals} emoji="💪" />
        <DealSection title={t('deals.opticsVision')} deals={opticDeals} emoji="👓" />
        <DealSection title={t('deals.technologyGaming')} deals={techDeals} emoji="🎮" />
        <DealSection title={t('deals.educationLeisure')} deals={educationDeals} emoji="📚" />
        <DealSection title={t('deals.entertainmentRelaxation')} deals={entertainmentDeals} emoji="🎯" />

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
    height: 28,
    width: 120,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  pointsGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
  },
  pointsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 4,
  },
  coinIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  upgradeBanner: {
    backgroundColor: '#9333EA',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  upgradeContent: {
    marginBottom: 12,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 14,
    color: '#E9D5FF',
    marginBottom: 12,
    lineHeight: 20,
  },
  upgradeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLevelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  currentLevelText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  arrowText: {
    fontSize: 12,
    color: '#E9D5FF',
  },
  upgradeButton: {
    backgroundColor: '#EAB308',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  featuredDeal: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredDealContent: {
    flex: 1,
    borderRadius: 16,
  },
  featuredDealOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  featuredDealTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featuredBadgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  featuredPointsBadge: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featuredPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  featuredContent: {
    alignItems: 'flex-start',
  },
  featuredCompany: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featuredDiscount: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  dealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  dealItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 14,
  },
});
