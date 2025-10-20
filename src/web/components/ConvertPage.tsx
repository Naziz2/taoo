import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Crown, Star, Gift, Zap, Target, TrendingUp, Smartphone, CreditCard, User, Package, Heart, Plane, Filter, Check, AlertCircle, Clock, XCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ConvertItem } from '../types/entities';

interface ConvertItemProps {
  item: ConvertItem;
  available: boolean;
  onShowDetail: (item: ConvertItem) => void;
  userPoints: number;
}

function ConvertItemCard({ item, available, onShowDetail, userPoints }: ConvertItemProps) {
  const { t } = useLanguage();
  const canAfford = userPoints >= item.pointsCost;
  const isAvailable = item.status === 'available' || item.status === 'upcoming';
  const isLocked = !isAvailable;//!canAfford || !isAvailable;

  const getDiscountText = () => {
    if (item.value && item.currency) {
      return `${item.value} ${item.currency}`;
    }
    return t('convert.specialOffer');
  };

  const handleClick = () => {
    if (available && canAfford && isAvailable) {
      onShowDetail(item);
    }
  };

  const cardStyle = {
    backgroundColor: item.bgColor || '#f3f4f6',
    color: item.textColor || '#374151',
    backgroundImage: item.thumbnail ? `url(${item.thumbnail})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  const titleStyle = {
    color: item.titleColor || '#ffffff',
  };

  return (
    <button 
      onClick={handleClick}
      className={`rounded-lg p-4 h-48 w-64 flex-shrink-0 flex flex-col justify-between relative ${
        isLocked ? 'opacity-50' : ''
      } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'} hover:scale-105 transition-transform`}
      disabled={isLocked}
    >
      <div className={`rounded-lg p-4 h-32 flex-shrink-0 flex flex-col justify-between relative ${
        isLocked ? 'opacity-50' : ''
      } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'} hover:scale-105 transition-transform`}
      style={cardStyle}
        >
        {/* Points Cost */}
        <div className="flex justify-between items-start mt-2">
          <div className="absolute top-2 right-2 px-2 py-1 flex items-center text-black bg-yellow-400 px-2 py-1 rounded-xl">
            <span className="text-xs font-bold">{item.pointsCost}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>
        {/* Quantity indicator */}
        {item.quantity && (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-white/90 flex items-center text-black px-2 py-1 rounded">
            {t('convert.quantity')} : {item.remainingQuantity}
          </div>
        )}
         {/* Status Badge */}
        {item.status !== 'available' && (
          <span className={`text-xs bg-black bg-opacity-20 text-white px-2 py-1 rounded ${
            item.status === 'upcoming' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {item.status === 'upcoming' ? t('convert.upcoming') : t('convert.expired')}
          </span>
        )}
      </div>
      {/* Title */}
      <div className=" items-center ">
        <div className="px-2 py-1 text-left ">
          <span className={`text-xs font-bold ${
            isLocked ? 'text-gray-500 ' : 'text-gray-900  dark:text-gray-200'
          }`}>
            {item.title}
          </span>
        </div>
        
      {/* Progress Bar */}
      {item.quantity && (<div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600  dark:text-gray-400">{t('convert.distributed')}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">{item.pointsCost * item.quantity/100} SAR</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${item.quantity > 0 ? (item.remainingQuantity / item.quantity) * 100 : 0}%` }}
          ></div>
        </div>
      </div>)}
        
      </div>
      
      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="bg-white rounded-lg p-2 text-center">
            <div className="text-xs font-bold text-gray-800">
              {!canAfford ? 'Points insuffisants' : 'Non disponible'}
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

interface ConvertSectionProps {
  title: string;
  items: ConvertItem[];
  onShowDetail: (item: ConvertItem) => void;
  userPoints: number;
}

function ConvertSection({ title, items, onShowDetail, userPoints }: ConvertSectionProps) {
  return (
    <section className="mb-6">
      <div className="flex items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2 h-56">
        {items.map((item) => (
          <ConvertItemCard 
            key={item.id} 
            item={item} 
            available={item.status === 'available' && (item.remainingQuantity || 0) > 0} 
            onShowDetail={onShowDetail}
            userPoints={userPoints}
          />
        ))}
      </div>
    </section>
  );
}

interface ConvertPageProps {
  onBack: () => void;
  currentUser?: any;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
  onShowConvertDetail?: (item: ConvertItem) => void;
}

export default function ConvertPage({ onBack, currentUser, onAccountClick, onShowUpgradeAccount, onShowConvertDetail }: ConvertPageProps) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'upcoming' | 'expired'>('all');

  const userPoints = currentUser?.points || 0;

  // Conversion items data
  const conversionItems: ConvertItem[] = [
    // Gift Cards
    {
      id: 'gc_001',
      title: 'Cheque Repas Pluxee 50 TND',
      description: 'Carte Resto Pluxee valable dans tous les restaurants partenaire en Tunisie',
      pointsCost: 5000,
      category: 'gift_card',
      status: 'available',
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/repas%20cheque%20maroc.jpg.webp?itok=LFKLaX2e',
      value: 50,
      currency: 'TND',
      partner: 'Pluxee',
      quantity: 100,
      remainingQuantity: 85,
      bgColor: '#e74c3c',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'gc_002',
      title: 'Cheque cadeau 100 TND',
      description: 'Cheque cadeau Pluxee',
      pointsCost: 10000,
      category: 'gift_card',
      status: 'available',
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk',
      value: 100,
      currency: 'TND',
      partner: 'Pluxee',
      quantity: 50,
      remainingQuantity: 42,
      bgColor: '#2ecc71',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'gc_003',
      title: 'Cheque cadeau 75 TND',
      description: 'Cheque cadeau Pluxee',
      pointsCost: 7500,
      category: 'gift_card',
      status: 'available',
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk',
      value: 75,
      currency: 'TND',
      partner: 'Pluxee',
      quantity: 30,
      remainingQuantity: 25,
      bgColor: '#3498db',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'gc_004',
      title: 'Cheque cadeau 200 TND',
      description: 'Cheque cadeau Pluxee',
      pointsCost: 20000,
      category: 'gift_card',
      status: 'available',
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk',
      value: 200,
      currency: 'TND',
      partner: 'Pluxee',
      quantity: 75,
      remainingQuantity: 60,
      bgColor: '#f39c12',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    
    // Free Products
    {
      id: 'fp_001',
      title: 'AirPods Pro 2',
      description: 'Écouteurs sans fil Apple AirPods Pro de dernière génération',
      pointsCost: 75000,
      category: 'free_product',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
      partner: 'TunisiaNet',
      quantity: 10,
      remainingQuantity: 7,
      bgColor: '#34495e',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'fp_002',
      title: 'Samsung Galaxy Watch',
      description: 'Montre connectée Samsung Galaxy Watch dernière génération',
      pointsCost: 45000,
      category: 'free_product',
      status: 'upcoming',
      thumbnail: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
      partner: 'Samsung',
      availableUntil: '2025-02-01',
      quantity: 15,
      remainingQuantity: 15,
      bgColor: '#9b59b6',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'fp_003',
      title: 'iPhone 16 Pro',
      description: 'Smartphone Apple iPhone 16 Pro 128GB',
      pointsCost: 269000,
      category: 'free_product',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
      partner: 'Apple Store',
      quantity: 5,
      remainingQuantity: 2,
      bgColor: '#1abc9c',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'fp_004',
      title: 'MacBook Air M2',
      description: 'Ordinateur portable Apple MacBook Air avec puce M2',
      pointsCost: 300000,
      category: 'free_product',
      status: 'expired',
      thumbnail: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      partner: 'Apple Store',
      expiresAt: '2024-12-31',
      bgColor: '#95a5a6',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    
    // Charity
    {
      id: 'ch_001',
      title: 'Don pour l\'Éducation 10 TND',
      description: 'Contribuez à l\'éducation des enfants défavorisés en Tunisie',
      pointsCost: 1000,
      category: 'charity',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 10,
      currency: 'TND',
      partner: 'Association Éducation Pour Tous',
      bgColor: '#e67e22',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ch_002',
      title: 'Don pour le croissant-Rouge 25 TND',
      description: 'Soutien alimentaire aux familles pauvres',
      pointsCost: 2500,
      category: 'charity',
      status: 'available',
      thumbnail: 'https://cdnuploads.aa.com.tr/uploads/Contents/2024/03/27/thumbs_b_c_c10102f31f922af641c0bf4434ec4a44.jpg?v=115211',
      value: 25,
      currency: 'TND',
      partner: 'Croissant Rouge Tunisien',
      bgColor: '#c0392b',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ch_003',
      title: 'Don pour l\'Environnement 50 TND',
      description: 'Soutenez les projets de protection de l\'environnement',
      pointsCost: 5000,
      category: 'charity',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 50,
      currency: 'TND',
      partner: 'Association Verte Tunisie',
      bgColor: '#27ae60',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ch_004',
      title: 'Don pour les Animaux 15 TND',
      description: 'Aidez les refuges pour animaux abandonnés ',
      pointsCost: 1500,
      category: 'charity',
      status: 'upcoming',
      thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 15,
      currency: 'TND',
      partner: 'Association de Protection des Animaux de Tunisie - PAT',
      availableUntil: '2025-02-15',
      bgColor: '#8e44ad',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    
    // Flouci Transfers
    {
      id: 'ft_001',
      title: 'Transfert Flouci 20 TND',
      description: 'Crédit Flouci directement dans votre portefeuille mobile',
      pointsCost: 2000,
      category: 'flouci_transfer',
      status: 'available',
      thumbnail: 'https://i0.wp.com/lapresse.tn/wp-content/uploads/2025/07/argent-tunisie.jpg?fit=850%2C491&ssl=1',
      value: 20,
      currency: 'TND',
      partner: 'Flouci',
      bgColor: '#ff6b35',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ft_002',
      title: 'Transfert Flouci 50 TND',
      description: 'Crédit Flouci directement dans votre portefeuille mobile',
      pointsCost: 5000,
      category: 'flouci_transfer',
      status: 'available',
      thumbnail: 'https://i0.wp.com/lapresse.tn/wp-content/uploads/2025/07/argent-tunisie.jpg?fit=850%2C491&ssl=1',
      value: 50,
      currency: 'TND',
      partner: 'Flouci',
      bgColor: '#ff8c42',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ft_003',
      title: 'Transfert Flouci 100 TND',
      description: 'Crédit Flouci directement dans votre portefeuille mobile',
      pointsCost: 10000,
      category: 'flouci_transfer',
      status: 'available',
      thumbnail: 'https://i0.wp.com/lapresse.tn/wp-content/uploads/2025/07/argent-tunisie.jpg?fit=850%2C491&ssl=1',
      value: 100,
      currency: 'TND',
      partner: 'Flouci',
      bgColor: '#ffa726',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'ft_004',
      title: 'Transfert Flouci 200 TND',
      description: 'Crédit Flouci directement dans votre portefeuille mobile',
      pointsCost: 20000,
      category: 'flouci_transfer',
      status: 'expired',
      thumbnail: 'https://i0.wp.com/lapresse.tn/wp-content/uploads/2025/07/argent-tunisie.jpg?fit=850%2C491&ssl=1',
      value: 200,
      currency: 'TND',
      partner: 'Flouci',
      expiresAt: '2024-12-31',
      bgColor: '#95a5a6',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    
    // Stays
    {
      id: 'st_001',
      title: 'Séjour 3 jours à Hammamet',
      description: 'Séjour tout compris dans un hôtel 4 étoiles à Hammamet',
      pointsCost: 150000,
      category: 'stay',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 1500,
      currency: 'TND',
      location: 'Hammamet, Tunisia',
      partner: 'TAOO Travel',
      quantity: 5,
      remainingQuantity: 3,
      bgColor: '#16a085',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'st_002',
      title: 'Weekend à Sidi Bou Said',
      description: 'Séjour de 2 nuits dans une maison d\'hôtes authentique',
      pointsCost: 80000,
      category: 'stay',
      status: 'upcoming',
      thumbnail: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 800,
      currency: 'TND',
      location: 'Sidi Bou Said, Tunisia',
      partner: 'TAOO Travel',
      availableUntil: '2025-03-01',
      quantity: 8,
      remainingQuantity: 8,
      bgColor: '#2980b9',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'st_003',
      title: 'Séjour Djerba 5 jours',
      description: 'Séjour tout compris à Djerba avec activités incluses',
      pointsCost: 200000,
      category: 'stay',
      status: 'available',
      thumbnail: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 2000,
      currency: 'TND',
      location: 'Djerba, Tunisia',
      partner: 'TAOO Travel',
      quantity: 3,
      remainingQuantity: 1,
      bgColor: '#8e44ad',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    },
    {
      id: 'st_004',
      title: 'Séjour Sousse Expired',
      description: 'Séjour qui a expiré - exemple',
      pointsCost: 120000,
      category: 'stay',
      status: 'expired',
      thumbnail: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 1200,
      currency: 'TND',
      location: 'Sousse, Tunisia',
      partner: 'TAOO Travel',
      expiresAt: '2024-12-31',
      bgColor: '#7f8c8d',
      textColor: '#ffffff',
      titleColor: '#ffffff'
    }
  ];

  const handleShowDetail = (item: ConvertItem) => {
    if (onShowConvertDetail) {
      onShowConvertDetail(item);
    }
  };

  // Filter items by status
  const filteredItems = conversionItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  // Categorize filtered items
  const giftCardItems = filteredItems.filter(item => item.category === 'gift_card');
  const freeProductItems = filteredItems.filter(item => item.category === 'free_product');
  const charityItems = filteredItems.filter(item => item.category === 'charity');
  const flouciItems = filteredItems.filter(item => item.category === 'flouci_transfer');
  const stayItems = filteredItems.filter(item => item.category === 'stay');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onAccountClick}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-yellow-400"
          >
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <img src="/taoo_black 1.png" alt="TAOO" width={80} height={30} className="object-contain dark:hidden" />
          <img src="/taoo_white.png" alt="TAOO" width={80} height={30} className="object-contain hidden dark:block" />
          <button 
            onClick={onShowUpgradeAccount}
            className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-gray-800 dark:text-gray-200">{userPoints.toLocaleString()}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </button>
        </div>
        
        <h1 className="text-xl font-semibold dark:text-gray-200">{t('convert.title') || 'Convertir mes Points'}</h1>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Points Balance Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t('convert.availablePoints') || 'Points Disponibles'}</h2>
              <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
            </div>
            <div className="text-4xl">
              <img src="/Image+Background.png" alt="🪙" width={40} height={40} />
            </div>
          </div>
          <div className="text-sm opacity-80 mt-2">
            {t('convert.pointsDesc') || 'Convertissez vos points en récompenses exclusives'}
          </div>
        </div>

        {/* Status Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('convert.filter') || 'Filtrer'}</h3>
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {[
              { key: 'all', label: t('convert.all') || 'Tout' },
              { key: 'available', label: t('convert.available') || 'Disponible' },
              { key: 'upcoming', label: t('convert.upcoming') || 'À venir' },
              { key: 'expired', label: t('convert.expired') || 'Expiré' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Cards Section */}
        {giftCardItems.length > 0 && (
          <ConvertSection 
            title="🎁 Cartes Cadeaux" 
            items={giftCardItems} 
            onShowDetail={handleShowDetail}
            userPoints={userPoints}
          />
        )}

        {/* Free Products Section */}
        {freeProductItems.length > 0 && (
          <ConvertSection 
            title="📱 Produits Gratuits" 
            items={freeProductItems} 
            onShowDetail={handleShowDetail}
            userPoints={userPoints}
          />
        )}

        {/* Charity Section */}
        {charityItems.length > 0 && (
          <ConvertSection 
            title="❤️ Dons de Charité" 
            items={charityItems} 
            onShowDetail={handleShowDetail}
            userPoints={userPoints}
          />
        )}

        {/* Flouci Transfers Section */}
        {flouciItems.length > 0 && (
          <ConvertSection 
            title="💳 Transferts Flouci" 
            items={flouciItems} 
            onShowDetail={handleShowDetail}
            userPoints={userPoints}
          />
        )}

        {/* Stays Section */}
        {stayItems.length > 0 && (
          <ConvertSection 
            title="✈️ Séjours & Voyages" 
            items={stayItems} 
            onShowDetail={handleShowDetail}
            userPoints={userPoints}
          />
        )}

        {/* No Items Message */}
        {filteredItems.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {t('convert.noItems') || 'Aucun élément trouvé'}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {t('convert.noItemsDesc') || 'Aucune récompense disponible pour les filtres sélectionnés.'}
            </p>
          </div>
        )}

        {/* Conversion Tips */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            💡 {t('convert.tips') || 'Conseils de Conversion'}
          </h3>
          <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
            <p>• {t('convert.tip1') || 'Les cartes cadeaux n\'expirent jamais une fois achetées'}</p>
            <p>• {t('convert.tip2') || 'Les produits gratuits sont limités en quantité'}</p>
            <p>• {t('convert.tip3') || 'Les dons de charité sont déductibles fiscalement'}</p>
            <p>• {t('convert.tip4') || 'Les transferts Flouci sont instantanés'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {t('convert.stats') || 'Statistiques'}
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {filteredItems.filter(item => item.status === 'available').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('convert.available') || 'Disponible'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {filteredItems.filter(item => item.status === 'upcoming').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('convert.upcoming') || 'À venir'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-500">
                {filteredItems.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('convert.total') || 'Total'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}