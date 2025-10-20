import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import DealCard from '../components/DealCard';

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
  const navigation = useNavigation<DealsScreenNavigationProp>();
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
      return `${deal.discountPercentAmount}% de réduction`;
    } else if (deal.discountType === 'MONEY' && deal.discountMoneyAmount > 0) {
      return `${deal.discountMoneyAmount}DT de réduction`;
    }
    return 'Offre spéciale';
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
            <Text style={styles.viewAllText}>Tout voir</Text>
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
                    console.log('Deal pressed:', deal.id);
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialCommunityIcons name="account" color="#6B7280" size={24} />
        </TouchableOpacity>

        <Text style={styles.logo}>DO SHOPPING</Text>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <Text style={styles.coinIcon}>🪙</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {userLevel === 'basic' && (
          <View style={styles.upgradeBanner}>
            <View style={styles.upgradeContent}>
              <Text style={styles.upgradeTitle}>Upgrade Your Account Level</Text>
              <Text style={styles.upgradeText}>
                Unlock premium deals and exclusive offers! Upgrade to Silver or Gold to access all premium content.
              </Text>
              <View style={styles.upgradeInfo}>
                <View style={styles.currentLevelBadge}>
                  <Text style={styles.currentLevelText}>Current: Basic</Text>
                </View>
                <Text style={styles.arrowText}>→ Silver/Gold</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>À la une</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.featuredDeal}>
            <View style={styles.featuredPointsBadge}>
              <Text style={styles.featuredPointsText}>35 pts</Text>
            </View>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Friends Pasta Bar</Text>
              <Text style={styles.featuredSubtitle}>Offre de Bienvenue</Text>
            </View>
          </TouchableOpacity>
        </View>

        <DealSection title="Restaurants & Gastronomie" deals={restaurantDeals} emoji="🍽️" />
        <DealSection title="Sport & Fitness" deals={sportDeals} emoji="💪" />
        <DealSection title="Optique & Vision" deals={opticDeals} emoji="👓" />
        <DealSection title="Technologie & Gaming" deals={techDeals} emoji="🎮" />
        <DealSection title="Éducation & Loisirs" deals={educationDeals} emoji="📚" />
        <DealSection title="Divertissement & Détente" deals={entertainmentDeals} emoji="🎯" />

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
    backgroundColor: '#D1D5DB',
    height: 130,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  featuredPointsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAB308',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featuredPointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  featuredContent: {
    alignItems: 'flex-start',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
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
    marginBottom: 12,
  },
});
