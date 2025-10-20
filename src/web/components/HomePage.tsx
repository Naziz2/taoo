import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import CategoryNav from './CategoryNav';
import PromotionCard from './PromotionCard';
import PartnerStore from './PartnerStore';
import GiftCard from './GiftCard';
import DailyRewardsWheel from './DailyRewardsWheel';
//import DailyRewardsPromoPopup from './DailyRewardsPromoPopup';

interface HomePageProps {
  currentUser?: any;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
  onShowStoreDetail?:(store: any) => void;
  onShowDealDetail?: (deal: any) => void;
  onShowDailyRewards?: () => void;
}

export default function HomePage({ currentUser,onAccountClick,onShowUpgradeAccount,onShowStoreDetail, onShowDealDetail, onShowDailyRewards }: HomePageProps) {
  const { t } = useLanguage();
  const [showPromoPopup, setShowPromoPopup] = useState(true);

  // Show promo popup for new users on first login
  useEffect(() => {
    if (currentUser?.isNewUser) {
      setShowPromoPopup(true);
    }
  }, [currentUser]);

  const partners = [
    { name: 'Jarir', logo: 'JR', bgColor: 'bg-orange-500', storeUrl: 'https://jarir.com' },
    { name: 'eXtra', logo: 'EX', bgColor: 'bg-pink-500', storeUrl: 'https://extra.com' },
    { name: 'Al Baik', logo: 'AB', bgColor: 'bg-red-500', storeUrl: 'https://albaik.com' },
    { name: 'Centrepoint', logo: 'CP', bgColor: 'bg-blue-600', storeUrl: 'https://centrepoint.com' },
  ];

  // Sample deals data for navigation
  const sampleDeals = {
    fashionSale: {
      id: 1,
      title: "Fashion Sale - Up to 50% off",
      companies: [{ id: 1, name: "H&M", logo: "https://server.taoo.ai/api/uploads/hm-logo" }],
      discountPercentAmount: 50.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 250,
      count: 100,
      remainCount: 85,
      premium: false,
      background: "#ff6b6b",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00",
      description: "Découvrez notre collection mode avec jusqu'à 50% de réduction sur une sélection d'articles tendance.",
      clientExpirableDaysCount: 30,
      sharable: true,
      giftable: false
    },
    summerSale: {
      id: 2,
      title: "Summer Sale - Up to 70% off",
      companies: [{ id: 2, name: "Mango", logo: "https://server.taoo.ai/api/uploads/mango-logo" }],
      discountPercentAmount: 70.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 350,
      count: 150,
      remainCount: 120,
      premium: false,
      background: "#ff9f43",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/468068063_10169935301505486_5007459974403657300_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=UPDH2rdpW7gQ7kNvwFfW3Xr&_nc_oc=AdnkvKx8eNp_hQVkIHBX8w9ZmevCXLDRPdGOZhZrJpEe_TBGGqwYKeTZTx03LsKAg2A&_nc_zt=23&_nc_ht=scontent.ftun14-1.fna&_nc_gid=MDeO69tZxufuZn6NdEqwTg&oh=00_AfU-79k8BcrPsCV3j0o6vnExSXdzh_8zm7Ws4wfENr5qPQ&oe=68A0F51B",
      discountType: "PERCENT",
      saleEndAt: "2025-08-31 23:59:00",
      description: "Profitez des soldes d'été avec des réductions exceptionnelles jusqu'à 70% sur toute la collection.",
      clientExpirableDaysCount: 45,
      sharable: true,
      giftable: true
    },
    giftCard50: {
      id: 3,
      title: "Carte Cadeau 50TND",
      companies: [{ id: 3, name: "TAOO Gift Cards", logo: "https://server.taoo.ai/api/uploads/taoo-logo" }],
      discountPercentAmount: 0.0,
      discountMoneyAmount: 50.0,
      pointSellPrice: 490,
      count: 300,
      remainCount: 280,
      premium: false,
      background: "#2ecc71",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/repas%20cheque%20maroc.jpg.webp?itok=LFKLaX2e",
      discountType: "MONEY",
      saleEndAt: "2025-12-31 23:59:00",
      description: "Carte cadeau d'une valeur de 50 TND utilisable chez tous nos partenaires.",
      clientExpirableDaysCount: 365,
      sharable: true,
      giftable: true
    },
    giftCard100: {
      id: 4,
      title: "Carte Cadeau 100TND",
      companies: [{ id: 3, name: "TAOO Gift Cards", logo: "https://server.taoo.ai/api/uploads/taoo-logo" }],
      discountPercentAmount: 0.0,
      discountMoneyAmount: 100.0,
      pointSellPrice: 990,
      count: 400,
      remainCount: 350,
      premium: false,
      background: "#f39c12",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk",
      discountType: "MONEY",
      saleEndAt: "2025-12-31 23:59:00",
      description: "Carte cadeau d'une valeur de 100 TND utilisable chez tous nos partenaires.",
      clientExpirableDaysCount: 365,
      sharable: true,
      giftable: true
    },
    parisTrip: {
      id: 5,
      title: "Voyage de 4 jours à Istanbul",
      companies: [{ id: 4, name: "TAOO Travel", logo: "https://server.taoo.ai/api/uploads/travel-logo" }],
      discountPercentAmount: 0.0,
      discountMoneyAmount: 2500.0,
      pointSellPrice: 250000,
      count: 10,
      remainCount: 8,
      premium: true,
      background: "#3498db",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      thumbnail: "https://image.resabooking.com/images/images_og/img_p_hotel_og_1065.jpg",
      discountType: "MONEY",
      saleEndAt: "2025-06-30 23:59:00",
      description: "Voyage exceptionnel de 4 jours à Paris incluant vol, hôtel 4 étoiles et petit-déjeuner.",
      clientExpirableDaysCount: 90,
      sharable: false,
      giftable: true
    },
    geantPromo: {
      id: 6,
      title: "Promotion Géant - 949 TND",
      companies: [{ id: 5, name: "Géant", logo: "https://server.taoo.ai/api/uploads/geant-logo" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 800,
      count: 50,
      remainCount: 35,
      premium: false,
      background: "#95a5a6",
      textColor: "#2c3e50",
      titleColor: "#2c3e50",
      thumbnail: "https://www.tunisianet.com.tn/modules/wbimageslider/views/img/b610ae3f3b20262c0c936625ac3d38834d6f8a3f_tv%20samsung%20promo.jpg",
      discountType: "PERCENT",
      saleEndAt: "2025-07-31 23:59:00",
      description: "Promotion spéciale Géant avec 15% de réduction sur une sélection de produits.",
      clientExpirableDaysCount: 60,
      sharable: true,
      giftable: false
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header points={currentUser.points} onAccountClick={onAccountClick} onPointsClick={onShowUpgradeAccount} />
      <CategoryNav />
      
      <div className="px-4 py-6 space-y-8">
        {/* Daily Rewards Game */}
        <DailyRewardsWheel 
          isOpen={showPromoPopup}
          onClose={() => setShowPromoPopup(false)}
          currentUser={currentUser}
          onShowUpgradeAccount={onShowUpgradeAccount}
          onPlayNow={() => {
            setShowPromoPopup(false);
            onShowDailyRewards?.();
          }}
        />

        {/* Promotions */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('home.promotions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onShowDealDetail?.(sampleDeals.fashionSale)}>
              <PromotionCard
                title="Fashion Sale"
                thumbnail={sampleDeals.fashionSale.thumbnail}
                discount="Up to 50% off"
                bgColor="bg-gradient-to-br from-amber-100 to-amber-200 "
              />
            </button>
            <button onClick={() => onShowDealDetail?.(sampleDeals.summerSale)}>
              <PromotionCard
                title="Summer Sale"
                 thumbnail={sampleDeals.summerSale.thumbnail}
                discount="Up to 70% off"
                bgColor="bg-gradient-to-br from-orange-200 to-pink-200"
              />
            </button>
          </div>
        </section>

        {/* Partner Stores */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('home.partnerStores')}</h2>
          <div className="grid grid-cols-4 gap-4">
            {partners.map((partner) => (
              <PartnerStore
                key={partner.name}
                name={partner.name}
                logo={partner.logo}
                bgColor={partner.bgColor}
                storeUrl={partner.storeUrl}
                onShowStoreDetail={onShowStoreDetail}
              />
            ))}
          </div>
        </section>

        {/* Earn Points Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-900 mb-1">{t('home.earnPoints')}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-800">{t('home.earnPointsDesc')}</p>
        </div>

        {/* Gift Cards */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('home.giftCards')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onShowDealDetail?.(sampleDeals.giftCard50)}>
              <GiftCard thumbnail={sampleDeals.giftCard50.thumbnail} amount="50TND" points={490} quantity={300} bgColor="bg-gradient-to-br from-green-400 to-green-500" />
            </button>
            <button onClick={() => onShowDealDetail?.(sampleDeals.giftCard100)}>
              <GiftCard 
                thumbnail={sampleDeals.giftCard100.thumbnail} amount="100TND" points={990} quantity={400} bgColor="bg-gradient-to-br from-yellow-400 to-yellow-500" />
            </button>
          </div>
        </section>

        {/* Premium Offers */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('home.premiumOffers')}</h2>
          <button 
            onClick={() => onShowDealDetail?.(sampleDeals.parisTrip)}
            className="w-full"
          >
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 h-48 relative overflow-hidden hover:scale-105 transition-transform" style={{ backgroundImage: "url('https://image.resabooking.com/images/images_og/img_p_hotel_og_1065.jpg')", backgroundSize: "cover" }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-white/90 px-2 py-1 rounded">Quantity: 2</span>
                <div className="flex items-center">
                  <span className="text-sm font-bold">19 560</span>
                  <span className="ml-1 text-yellow-600">
                    <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-semibold">7 Jours à Istanbul</h3>
              </div>
            </div>
          </button>
        </section>

        {/* Best Selection */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('home.geantSelection')}</h2>
          <button 
            onClick={() => onShowDealDetail?.(sampleDeals.geantPromo)}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-4 h-32 relative overflow-hidden hover:scale-105 transition-transform" style={{ backgroundImage: `url(${sampleDeals.geantPromo.thumbnail})`, backgroundSize: "cover" , backgroundPosition: "center center" }}>
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                799DT
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-gray-800 font-semibold">{t('home.promotion')}</h3>
              </div>
            </div>
          </button>
        </section>
      </div>

      {/* Daily Rewards Promo Popup 
      <DailyRewardsPromoPopup
        isOpen={showPromoPopup}
        onClose={() => setShowPromoPopup(false)}
        onPlayNow={() => {
          setShowPromoPopup(false);
          onShowDailyRewards?.();
        }} 
      />*/}
    </div>
  );
}