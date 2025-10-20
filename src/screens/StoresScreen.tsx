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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Fashion', 'HighTech', 'Education', 'Beauty', 'Health'];

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'All': t('stores.all'),
      'Food': t('stores.food'),
      'Fashion': t('stores.fashion'),
      'HighTech': t('stores.highTech'),
      'Education': t('stores.education'),
      'Beauty': t('stores.beauty'),
      'Health': t('stores.health'),
    };
    return categoryMap[category] || category;
  };

  const storesData: Store[] = [
    {
      name: 'Al Baik',
      logo: null,
      logoInitials: 'AB',
      webLink: 'https://albaik.com',
      category: 'Food',
      cashback: '5% cashback',
      bgColor: '#EF4444',
    },
    {
      name: 'Jarir Bookstore',
      logo: null,
      logoInitials: 'JR',
      webLink: 'https://jarir.com',
      category: 'HighTech',
      cashback: '3% cashback',
      bgColor: '#3B82F6',
    },
    {
      name: 'Centrepoint',
      logo: null,
      logoInitials: 'CP',
      webLink: 'https://centrepoint.com',
      category: 'Fashion',
      cashback: '4% cashback',
      bgColor: '#8B5CF6',
    },
    {
      name: 'Ben Yaghlane',
      logo: 'https://server.taoo.ai/api/uploads/8c1687f4-ca82-4215-be01-629ee10bc885',
      webLink: 'http://www.benyaghlanepro.com/FR/',
      category: 'Food',
      cashback: '2% cashback',
      bgColor: '#10B981',
    },
    {
      name: 'Kiabi',
      logo: 'https://server.taoo.ai/api/uploads/b0816db2-1ee8-4aee-aec8-bd1d35d271b1',
      webLink: 'https://kiabi.tn',
      category: 'Fashion',
      cashback: '3.5% cashback',
      bgColor: '#EC4899',
    },
    {
      name: 'KFC',
      logo: 'https://server.taoo.ai/api/uploads/08140cc2-b7b3-4628-af28-4654e0679dd6',
      webLink: 'https://kfc.com.tn',
      category: 'Food',
      cashback: '2.5% cashback',
      bgColor: '#DC2626',
    },
    {
      name: "Z'Animax",
      logo: 'https://server.taoo.ai/api/uploads/a8483beb-d04c-4173-8613-2c2588bb4be9',
      webLink: 'https://www.zanimax.tn',
      category: 'Health',
      cashback: '4% cashback',
      bgColor: '#059669',
    },
    {
      name: 'La Reine',
      logo: 'https://server.taoo.ai/api/uploads/2878ede2-18e3-48fa-9fe4-f7df4ace6059',
      webLink: 'https://lareine.com.tn/',
      category: 'Beauty',
      cashback: '5% cashback',
      bgColor: '#DB2777',
    },
    {
      name: 'Edito',
      logo: 'https://server.taoo.ai/api/uploads/07d17edd-92f1-448d-ba42-4e4d0e48e319',
      webLink: null,
      category: 'Education',
      cashback: '3% cashback',
      bgColor: '#F59E0B',
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
      webLink: null,
      category: 'Food',
      cashback: '3% cashback',
      bgColor: '#14B8A6',
    },
    {
      name: 'TunisiaNet',
      logo: null,
      logoInitials: 'TN',
      webLink: 'https://tunisianet.com.tn',
      category: 'HighTech',
      cashback: '2% cashback',
      bgColor: '#0EA5E9',
    },
  ];

  const filteredStores = storesData.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const StoreCard = ({ store }: { store: Store }) => (
    <TouchableOpacity style={styles.storeCard}>
      <View style={styles.cardContent}>
        <View style={[styles.storeLogo, { backgroundColor: store.bgColor }]}>
          {store.logo ? (
            <Image source={{ uri: store.logo }} style={styles.logoImage} resizeMode="contain" />
          ) : (
            <Text style={styles.logoText}>{store.logoInitials}</Text>
          )}
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.storeCategory}>{store.category}</Text>
        </View>
      </View>
      {store.cashback && (
        <View style={styles.cashbackBadge}>
          <Text style={styles.cashbackText}>{store.cashback}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
              <Text style={styles.emptyText}>No stores found</Text>
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
    borderRadius: 8,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryButtonActive: {
    backgroundColor: '#EAB308',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#111827',
  },
  storesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  cashbackBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  cashbackText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  cashbackLabel: {
    fontSize: 12,
    color: '#6B7280',
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
