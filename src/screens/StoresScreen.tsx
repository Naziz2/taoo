import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinIcon from '../components/CoinIcon';

interface Store {
  name: string;
  logo: string | null;
  logoInitials?: string;
  webLink: string | null;
  category: string;
  cashback?: string;
  bgColor: string;
}

export default function StoresScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Fashion', 'HighTech', 'Education', 'Beauty', 'Health', 'Entertainment'];

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'All': t('stores.all'),
      'Food': t('stores.food'),
      'Fashion': t('stores.fashion'),
      'HighTech': t('stores.highTech'),
      'Education': t('stores.education'),
      'Beauty': t('stores.beauty'),
      'Health': t('stores.health'),
      'Entertainment': 'Entertainment',
    };
    return categoryMap[category] || category;
  };

  const storesData: Store[] = [
    // Food & Restaurants
    {
      name: 'Ben Yaghlane',
      logo: 'https://server.taoo.ai/api/uploads/8c1687f4-ca82-4215-be01-629ee10bc885',
      webLink: 'http://www.benyaghlanepro.com/FR/',
      category: 'Food',
      cashback: '2% cashback',
      bgColor: '#10B981',
    },
    {
      name: 'KFC Tunisia',
      logo: 'https://server.taoo.ai/api/uploads/08140cc2-b7b3-4628-af28-4654e0679dd6',
      webLink: 'https://kfc.com.tn',
      category: 'Food',
      cashback: '2.5% cashback',
      bgColor: '#DC2626',
    },
    {
      name: 'Moons',
      logo: 'https://server.taoo.ai/api/uploads/2359e625-1596-4e22-8644-fecef9bda0bd',
      webLink: 'https://moons.tn/',
      category: 'Food',
      cashback: '4.5% cashback',
      bgColor: '#6366F1',
    },
    {
      name: 'Mikui',
      logo: 'https://server.taoo.ai/api/uploads/8af4ada7-b51f-4fcb-914b-da3276ccbc69',
      webLink: 'https://www.facebook.com/mikuitunisie/',
      category: 'Food',
      cashback: '3% cashback',
      bgColor: '#14B8A6',
    },
    {
      name: 'Pizza Hut Tunisia',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Pizza_Hut_logo.svg/200px-Pizza_Hut_logo.svg.png',
      webLink: 'https://www.pizzahut.tn/',
      category: 'Food',
      cashback: '3% cashback',
      bgColor: '#C00A27',
    },
    {
      name: 'Subway Tunisia',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/200px-Subway_2016_logo.svg.png',
      webLink: 'https://subway.com.tn/',
      category: 'Food',
      cashback: '2.5% cashback',
      bgColor: '#008C15',
    },
    {
      name: 'Le Coin Gourmand',
      logo: null,
      logoInitials: 'LG',
      webLink: 'https://www.facebook.com/lecoingourmandtunisie/',
      category: 'Food',
      cashback: '4% cashback',
      bgColor: '#D97706',
    },
    {
      name: 'La Poire',
      logo: null,
      logoInitials: 'LP',
      webLink: 'https://lapoire.com.tn/',
      category: 'Food',
      cashback: '3.5% cashback',
      bgColor: '#16A34A',
    },
    
    // Cafés
    {
      name: 'Café Culturel El Teatro',
      logo: null,
      logoInitials: 'ET',
      webLink: 'https://www.facebook.com/elteatro.tunis/',
      category: 'Food',
      cashback: '5% cashback',
      bgColor: '#92400E',
    },
    {
      name: 'Columbus Café',
      logo: null,
      logoInitials: 'CC',
      webLink: 'https://www.facebook.com/ColumbusChocolatiersTunisie/',
      category: 'Food',
      cashback: '4% cashback',
      bgColor: '#78350F',
    },
    
    // Fashion
    {
      name: 'Kiabi',
      logo: 'https://server.taoo.ai/api/uploads/b0816db2-1ee8-4aee-aec8-bd1d35d271b1',
      webLink: 'https://kiabi.tn',
      category: 'Fashion',
      cashback: '3.5% cashback',
      bgColor: '#EC4899',
    },
    {
      name: 'LC Waikiki Tunisia',
      logo: null,
      logoInitials: 'LC',
      webLink: 'https://www.lcwaikiki.com/tn-FR/TN',
      category: 'Fashion',
      cashback: '4% cashback',
      bgColor: '#1E40AF',
    },
    {
      name: 'Bershka Tunisia',
      logo: null,
      logoInitials: 'BK',
      webLink: 'https://www.bershka.com/tn/',
      category: 'Fashion',
      cashback: '5% cashback',
      bgColor: '#000000',
    },
    {
      name: 'Jennyfer Tunisia',
      logo: null,
      logoInitials: 'JF',
      webLink: 'https://www.jennyfer.com/tn-fr/',
      category: 'Fashion',
      cashback: '3% cashback',
      bgColor: '#EC4899',
    },
    
    // HighTech
    {
      name: 'TunisiaNet',
      logo: 'https://www.tunisianet.com.tn/img/tunisianet-logo-1590669863.jpg',
      webLink: 'https://tunisianet.com.tn',
      category: 'HighTech',
      cashback: '2% cashback',
      bgColor: '#0EA5E9',
    },
    {
      name: 'MyTek',
      logo: null,
      logoInitials: 'MT',
      webLink: 'https://www.mytek.tn/',
      category: 'HighTech',
      cashback: '2.5% cashback',
      bgColor: '#7C3AED',
    },
    {
      name: 'Zoom',
      logo: null,
      logoInitials: 'ZM',
      webLink: 'https://www.zoom.com.tn/',
      category: 'HighTech',
      cashback: '3% cashback',
      bgColor: '#DC2626',
    },
    {
      name: 'Electroplanet',
      logo: null,
      logoInitials: 'EP',
      webLink: 'https://www.electroplanet.tn/',
      category: 'HighTech',
      cashback: '3.5% cashback',
      bgColor: '#F59E0B',
    },
    
    // Beauty
    {
      name: 'La Reine',
      logo: 'https://server.taoo.ai/api/uploads/2878ede2-18e3-48fa-9fe4-f7df4ace6059',
      webLink: 'https://lareine.com.tn/',
      category: 'Beauty',
      cashback: '5% cashback',
      bgColor: '#DB2777',
    },
    {
      name: 'Nocibé Tunisia',
      logo: null,
      logoInitials: 'NB',
      webLink: 'https://www.nocibe.tn/',
      category: 'Beauty',
      cashback: '4% cashback',
      bgColor: '#BE185D',
    },
    
    // Health
    {
      name: "Z'Animax",
      logo: 'https://server.taoo.ai/api/uploads/a8483beb-d04c-4173-8613-2c2588bb4be9',
      webLink: 'https://www.zanimax.tn',
      category: 'Health',
      cashback: '4% cashback',
      bgColor: '#059669',
    },
    
    // Education
    {
      name: 'Edito',
      logo: 'https://server.taoo.ai/api/uploads/07d17edd-92f1-448d-ba42-4e4d0e48e319',
      webLink: 'https://www.facebook.com/edito.librairie/',
      category: 'Education',
      cashback: '3% cashback',
      bgColor: '#F59E0B',
    },
    {
      name: 'Cultura Tunisia',
      logo: null,
      logoInitials: 'CL',
      webLink: 'https://www.facebook.com/CulturaTunisia/',
      category: 'Education',
      cashback: '4% cashback',
      bgColor: '#2563EB',
    },
    
    // Entertainment & Game Zones
    {
      name: 'Galaxy Gaming',
      logo: null,
      logoInitials: 'GG',
      webLink: 'https://www.facebook.com/galaxygamingtunis/',
      category: 'Entertainment',
      cashback: '6% cashback',
      bgColor: '#8B5CF6',
    },
    {
      name: 'Fun City Tunisia',
      logo: null,
      logoInitials: 'FC',
      webLink: 'https://www.facebook.com/FunCityTunisia/',
      category: 'Entertainment',
      cashback: '5% cashback',
      bgColor: '#EF4444',
    },
    {
      name: 'Strike Bowling',
      logo: null,
      logoInitials: 'SB',
      webLink: 'https://www.facebook.com/StrikeBowlingTunisie/',
      category: 'Entertainment',
      cashback: '5.5% cashback',
      bgColor: '#7C3AED',
    },
    {
      name: 'Cinematheque',
      logo: null,
      logoInitials: 'CM',
      webLink: 'https://www.cinematheque.tn/',
      category: 'Entertainment',
      cashback: '4% cashback',
      bgColor: '#1F2937',
    },
    {
      name: 'Pathé Tunisia',
      logo: null,
      logoInitials: 'PT',
      webLink: 'https://www.facebook.com/PatheGaumont.Tunisie/',
      category: 'Entertainment',
      cashback: '4.5% cashback',
      bgColor: '#DC2626',
    },
  ];

  const filteredStores = storesData.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const FeaturedStoreCard = ({ store }: { store: Store }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('StoreDetail', { store })}
    >
      <View style={[styles.featuredLogo, { backgroundColor: store.bgColor }]}>
        {store.logo ? (
          <Image source={{ uri: store.logo }} style={styles.featuredLogoImage} resizeMode="contain" />
        ) : (
          <Text style={styles.featuredLogoText}>{store.logoInitials}</Text>
        )}
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName}>{store.name}</Text>
        <Text style={styles.featuredCategory}>{store.category}</Text>
        {store.cashback && (
          <View style={styles.featuredBadge}>
            <MaterialCommunityIcons name="star" size={14} color="#EAB308" />
            <Text style={styles.featuredBadgeText}>
              {store.cashback.replace('cashback', t('stores.cashback'))}
            </Text>
          </View>
        )}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const StoreCard = ({ store }: { store: Store }) => (
    <TouchableOpacity
      style={styles.storeCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('StoreDetail', { store })}
    >
      <View style={[styles.storeLogo, { backgroundColor: store.bgColor }]}>
        {store.logo ? (
          <Image source={{ uri: store.logo }} style={styles.logoImage} resizeMode="contain" />
        ) : (
          <Text style={styles.logoText}>{store.logoInitials}</Text>
        )}
      </View>
      <Text style={styles.storeName} numberOfLines={2}>{store.name}</Text>
      {store.cashback && (
        <View style={styles.cashbackBadge}>
          <MaterialCommunityIcons name="wallet-giftcard" size={12} color="#92400E" />
          <Text style={styles.cashbackText}>
            {store.cashback.replace('cashback', t('stores.cashback'))}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Account')}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View style={styles.searchSection}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('stores.searchPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Category Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {getCategoryLabel(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Stores Section */}
        {selectedCategory === 'All' && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="star-circle" size={24} color="#EAB308" />
              <Text style={styles.sectionTitle}>{t('stores.featuredPartners')}</Text>
            </View>
            <View style={styles.featuredList}>
              {storesData.slice(0, 5).map((store, index) => (
                <FeaturedStoreCard key={index} store={store} />
              ))}
            </View>
          </View>
        )}

        {/* Stores Grid Header */}
        <View style={styles.gridHeader}>
          <Text style={styles.gridTitle}>
            {selectedCategory === 'All' ? t('stores.allStores') : `${getCategoryLabel(selectedCategory)} ${t('stores.title')}`}
          </Text>
          <Text style={styles.gridCount}>{t('stores.storesCount', { count: filteredStores.length })}</Text>
        </View>

        {/* Stores Grid */}
        <View style={styles.storesGrid}>
          {filteredStores.map((store, index) => (
            <View key={index} style={styles.gridItem}>
              <StoreCard store={store} />
            </View>
          ))}
          {filteredStores.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="store-off" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>{t('stores.noResults')}</Text>
            </View>
          )}
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
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#EAB308',
    borderColor: '#EAB308',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Featured Section
  featuredSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  featuredList: {
    paddingHorizontal: 16,
  },
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredLogoImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  featuredLogoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  featuredInfo: {
    flex: 1,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
    marginLeft: 4,
  },
  // Grid Section
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  gridCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  storesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    minHeight: 160,
  },
  storeLogo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    minHeight: 36,
  },
  cashbackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  cashbackText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    width: '100%',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 12,
  },
});
