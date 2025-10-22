import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import CoinIcon from '../components/CoinIcon';

interface ConvertItem {
  id: number;
  title: string;
  category: string;
  categoryEmoji: string;
  pointCost: number;
  value: string;
  thumbnail: string;
  stock: number;
  maxStock: number;
  description: string;
}

export default function ConvertScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useLanguage();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Use consistent points value from user context
  const userPoints = user?.points || 0;

  const categories = [
    { id: 'all', label: t('convert.all'), emoji: '📋' },
    { id: 'featured', label: t('convert.featured'), emoji: '⭐' },
    { id: 'recent', label: t('convert.recent'), emoji: '🆕' },
  ];

  const convertItems: ConvertItem[] = [
    {
      id: 1,
      title: 'Carte Cadeau 100 TND',
      category: 'gift_cards',
      categoryEmoji: '🎁',
      pointCost: 10000,
      value: '100 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/e068eb2f-b59f-44f7-821c-867540fe1d3d',
      stock: 15,
      maxStock: 20,
      description: 'Carte cadeau prépayée valable dans tous nos magasins partenaires',
    },
    {
      id: 2,
      title: 'Casbah Money Pluxee 50 TND',
      category: 'gift_cards',
      categoryEmoji: '🎁',
      pointCost: 5000,
      value: '50 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/aabb4015-262e-4b77-8a8d-b385c3bc734d',
      stock: 25,
      maxStock: 30,
      description: 'Pluxee card rechargeable pour vos achats quotidiens',
    },
    {
      id: 3,
      title: 'Produit Gaming Premium',
      category: 'products',
      categoryEmoji: '📱',
      pointCost: 14000,
      value: '140 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/f31299e5-144c-430a-b767-e8e1bd87e626',
      stock: 8,
      maxStock: 15,
      description: 'Accessoires gaming de haute qualité',
    },
    {
      id: 4,
      title: 'Set Café Premium',
      category: 'products',
      categoryEmoji: '☕',
      pointCost: 14000,
      value: '140 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/53675b42-5253-4bb1-b98e-ede5c610138b',
      stock: 12,
      maxStock: 20,
      description: 'Ensemble café luxueux pour amateurs',
    },
    {
      id: 5,
      title: 'Cours de Chinois - Niveau 1',
      category: 'education',
      categoryEmoji: '🎓',
      pointCost: 8000,
      value: '80 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/ebc2ec88-e89a-4d85-b89f-659005059698',
      stock: 20,
      maxStock: 25,
      description: 'Formation complète de chinois pour débutants',
    },
    {
      id: 6,
      title: 'Best pour Education 50 TND',
      category: 'education',
      categoryEmoji: '📚',
      pointCost: 5000,
      value: '50 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/2d05b7e5-a681-471a-8d3f-185b3f68348b',
      stock: 30,
      maxStock: 40,
      description: 'Bon d\'achat pour matériel éducatif',
    },
    {
      id: 7,
      title: 'Transfert d\'argent 50 TND',
      category: 'flouci',
      categoryEmoji: '💰',
      pointCost: 5000,
      value: '50 TND',
      thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&h=300&fit=crop',
      stock: 50,
      maxStock: 100,
      description: 'Transfert d\'argent instantané',
    },
    {
      id: 8,
      title: 'Cash Back 50 TND',
      category: 'flouci',
      categoryEmoji: '�',
      pointCost: 5000,
      value: '50 TND',
      thumbnail: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=500&h=300&fit=crop',
      stock: 45,
      maxStock: 100,
      description: 'Crédit cash pour vos paiements',
    },
    {
      id: 9,
      title: 'Welcome to Raf Raf Beach',
      category: 'travel',
      categoryEmoji: '✈️',
      pointCost: 15000,
      value: '150 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/03e5d887-cc21-472e-8d03-9a2ce56b1521',
      stock: 10,
      maxStock: 15,
      description: 'Séjour relaxant à la plage de Raf Raf',
    },
    {
      id: 10,
      title: 'Billet à Speos d\'Amenhotep III',
      category: 'travel',
      categoryEmoji: '🏛️',
      pointCost: 12000,
      value: '120 TND',
      thumbnail: 'https://server.taoo.ai/api/uploads/17b3e31e-7324-4c8b-8ed4-371395f13c2e',
      stock: 18,
      maxStock: 25,
      description: 'Visite guidée du temple historique',
    },
  ];

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      gift_cards: t('convert.categoryGiftCards'),
      products: t('convert.categoryGeneralProducts'),
      education: t('convert.categoryChineseCourses'),
      flouci: t('convert.categoryFlouciTransactions'),
      travel: t('convert.categoryTravelAgencies'),
    };
    return categoryNames[categoryId] || categoryId;
  };

  const groupedItems = convertItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: ConvertItem[] });

  const canAfford = (pointCost: number) => userPoints >= pointCost;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={[styles.profileButton, { marginTop: 0 }]}
          onPress={() => navigation.navigate('Account')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="account" color="#6B7280" size={24} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/taoo_black 1.png')}
          style={styles.headerTitle}
          resizeMode="contain"
        />

        <TouchableOpacity 
          style={styles.pointsContainer}
          onPress={() => navigation.navigate('Wallet')}
          activeOpacity={0.8}
        >
          <View style={styles.pointsGlow} />
          <Text style={styles.pointsText}>{userPoints.toLocaleString()}</Text>
          <CoinIcon size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Points Balance Card */}
        <TouchableOpacity 
          style={styles.pointsCard}
          onPress={() => navigation.navigate('Wallet')}
          activeOpacity={0.9}
        >
          <View style={styles.pointsWave} />
          <View style={styles.pointsCardContent}>
            <CoinIcon size={48} />
            <Text style={styles.pointsAmount}>{userPoints.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>{t('convert.pointsYouHave')}</Text>
          </View>
        </TouchableOpacity>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>{t('convert.category')}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterChip,
                  selectedCategory === cat.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === cat.id && styles.filterChipTextActive,
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Convert Items by Category */}
        {Object.entries(groupedItems).map(([categoryId, items]) => (
          <View key={categoryId} style={styles.categorySection}>
            <View style={styles.categorySectionHeader}>
              <Text style={styles.categorySectionTitle}>
                {getCategoryName(categoryId)}
              </Text>
              <MaterialCommunityIcons name="information-outline" size={20} color="#6B7280" />
            </View>

            <View style={styles.itemsGrid}>
              {items.map((item) => {
                const affordable = canAfford(item.pointCost);
                const stockPercentage = (item.stock / item.maxStock) * 100;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.itemCard}
                    onPress={() => navigation.navigate('ConvertItemDetail', { item })}
                    activeOpacity={0.8}
                    disabled={!affordable}
                  >
                    <ImageBackground
                      source={{ uri: item.thumbnail }}
                      style={styles.itemImage}
                      imageStyle={styles.itemImageStyle}
                    >
                      {!affordable && (
                        <View style={styles.lockedOverlay}>
                          <MaterialCommunityIcons name="lock" size={24} color="#FFFFFF" />
                        </View>
                      )}
                      <View style={styles.itemBadge}>
                        <Text style={styles.itemBadgeText}>{item.category === 'featured' ? `⭐ ${t('convert.featured')}` : t('convert.all')}</Text>
                      </View>
                    </ImageBackground>

                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.itemValue}>{item.value}</Text>
                      
                      <View style={styles.itemFooter}>
                        <View style={styles.itemPoints}>
                          <Text style={styles.itemPointsText}>{item.pointCost.toLocaleString()}</Text>
                          <CoinIcon size={14} />
                        </View>
                        <TouchableOpacity 
                          style={[
                            styles.itemButton,
                            !affordable && styles.itemButtonDisabled
                          ]}
                          disabled={!affordable}
                        >
                          <Text style={styles.itemButtonText}>{t('convert.get')}</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Stock Progress Bar */}
                      <View style={styles.stockBar}>
                        <View 
                          style={[
                            styles.stockBarFill,
                            { width: `${stockPercentage}%` }
                          ]} 
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Info Section */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{t('convert.additionalInfo')}</Text>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>{t('convert.termsOfUse')}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>{t('convert.howToUsePoints')}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>{t('convert.whatTaooOffers')}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chevron-left" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>{t('convert.getMorePoints')}</Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>{t('convert.days')}</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxOrange]}>
            <Text style={[styles.statNumber, styles.statNumberOrange]}>3</Text>
            <Text style={[styles.statLabel, styles.statLabelOrange]}>{t('convert.points')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>{t('convert.posts')}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  headerTitle: { 
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
  content: {
    flex: 1,
  },
  pointsCard: {
    backgroundColor: '#EAB308',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#FDE68A',
  },
  pointsWave: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
  },
  pointsCardContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  coinIconLarge: {
    fontSize: 56,
    marginBottom: 12,
  },
  pointsAmount: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 1,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#78350F',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  filterSection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'right',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#EAB308',
    borderColor: '#EAB308',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  categorySection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  categorySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categorySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  itemCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 16,
  },
  itemImage: {
    width: '100%',
    height: 140,
    justifyContent: 'space-between',
    padding: 8,
  },
  itemImageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAB308',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#111827',
  },
  itemContent: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#E5E7EB',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    height: 36,
  },
  itemValue: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 4,
  },
  itemPointsIcon: {
    fontSize: 14,
  },
  itemButton: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  itemButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  itemButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  stockBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  stockBarFill: {
    height: '100%',
    backgroundColor: '#EAB308',
    borderRadius: 2,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'flex-end',
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    marginRight: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginTop: 24,
  },
  statBox: {
    alignItems: 'center',
    padding: 16,
  },
  statBoxOrange: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  statNumberOrange: {
    color: '#EA580C',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statLabelOrange: {
    color: '#EA580C',
  },
});
