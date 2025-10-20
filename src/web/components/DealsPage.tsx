import React, { useState } from 'react';
import Header from './Header';

interface Deal {
  id: number;
  title: string;
  companies: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
  discountPercentAmount: number;
  discountMoneyAmount: number;
  pointSellPrice: number;
  count: number;
  premium: boolean;
  vip: boolean;
  background: string;
  textColor: string;
  titleColor: string;
  thumbnail: string;
  discountType: 'PERCENT' | 'MONEY';
  saleEndAt: string;
}

interface DealItemProps {
  deal: Deal;
  available: boolean;
  onShowDetail: (deal: Deal) => void;
  userLevel: 'basic' | 'silver' | 'gold';
}

function DealItem({ deal, available, onShowDetail, userLevel }: DealItemProps) {
  const canAccessPremium = userLevel === 'silver' || userLevel === 'gold';
  const isPremiumLocked = deal.premium && !canAccessPremium;
  const isVipLocked = deal.premium && deal.vip && !(userLevel != 'gold');

  const getDiscountText = () => {
    if (deal.discountType === 'PERCENT' && deal.discountPercentAmount > 0) {
      return `${deal.discountPercentAmount}% de réduction`;
    } else if (deal.discountType === 'MONEY' && deal.discountMoneyAmount > 0) {
      return `${deal.discountMoneyAmount}DT de réduction`;
    }
    return 'Offre spéciale';
  };

  const handleClick = () => {
    if (available) {
      onShowDetail(deal);
    }
  };

  const cardStyle = {
    backgroundColor: deal.background || '#f3f4f6',
    color: deal.textColor || '#374151',
  };

  const titleStyle = {
    color: deal.titleColor || '#ffffff',
  };

  return (
    <button 
      onClick={handleClick}
      className={`rounded-lg p-3 h-32 flex flex-col justify-between relative ${
        !available || isPremiumLocked || isVipLocked ? 'opacity-50' : ''
      } ${isPremiumLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={cardStyle}
      disabled={isPremiumLocked || isVipLocked}
    >
      {deal.premium && (
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
          isPremiumLocked 
            ? 'bg-gray-400 text-gray-600' 
            : 'bg-purple-500 text-white'
        }`}>
          {isPremiumLocked ? '🔒 Premium' : (isVipLocked? '🔒 VIP' :'Premium')}
        </div>
      )}
      
      <div className="font-semibold text-sm" style={titleStyle}>
        {deal.companies[0]?.name || 'Partenaire'}
      </div>
      
      <div className="text-xs opacity-80">
        <div>{getDiscountText()}</div>
        <div className="truncate">{deal.title}</div>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className={`px-2 py-1 rounded-full ${
          isPremiumLocked || isVipLocked
            ? 'bg-gray-300' 
            : 'bg-yellow-400'
        }`}>
          <span className={`text-xs font-bold ${
            isPremiumLocked || isVipLocked
              ? 'text-gray-500' 
              : 'text-gray-900'
          }`}>
            {isPremiumLocked || isVipLocked ? 'Upgrade Required' : `${deal.pointSellPrice} pts`}
          </span>
        </div>
      </div>
      
      {isPremiumLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="bg-white rounded-lg p-2 text-center">
            <div className="text-xs font-bold text-gray-800">{isVipLocked? 'Gold' :'Silver/Gold'} Required</div>
          </div>
        </div>
      )}
    </button>
  );
}

interface DealSectionProps {
  title: string;
  deals: Deal[];
  viewAllText?: string;
  onShowDetail: (deal: Deal) => void;
  userLevel: 'basic' | 'silver' | 'gold';
}

function DealSection({ title, deals, viewAllText = "Tout voir", onShowDetail, userLevel }: DealSectionProps) {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <button className="text-blue-500 text-sm">{viewAllText}</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {deals.slice(0, 4).map((deal) => (
          <DealItem 
            key={deal.id} 
            deal={deal} 
            available={deal.count > 0} 
            onShowDetail={onShowDetail}
            userLevel={userLevel}
          />
        ))}
      </div>
    </section>
  );
}

interface DealsPageProps {
  currentUser?: any;
  onAccountClick?: () => void;
  onShowDealDetail?: () => void;
  onShowDealDetailWithData?: (deal: Deal) => void;
  onShowUpgradeAccount?: () => void;
}

export default function DealsPage({currentUser,onAccountClick, onShowDealDetail, onShowDealDetailWithData, onShowUpgradeAccount }: DealsPageProps) {
  const userPoints = currentUser.points;
  const userLevel = currentUser.level;

  // Real deals data
  const dealsData: Deal[] = [
    {
      id: 12,
      title: "Offre de Bienvenue",
      companies: [{ id: 4, name: "Friends Pasta Bar", logo: "https://server.taoo.ai/api/uploads/9e8d2ee5-3d5c-477c-a490-6ca75e293aab" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 35.0,
      count: 8,
      remainCount:6,
      premium: false,
      vip: false,
      background: "#53693f",
      textColor: "#002e0b",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/e068eb2f-b59f-44f7-821c-867540fe1d3d",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 23,
      title: "Enfants moins de 13 ans",
      companies: [{ id: 7, name: "Urban Dance", logo: "https://server.taoo.ai/api/uploads/2c5f4f36-977c-4d05-8fc7-ac8aa80ebf70" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 140.0,
      count: 11,
      remainCount:6,
      premium: true,
      vip: false,
      background: "#67568f",
      textColor: "",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/aabb4015-262e-4b77-8a8d-b385c3bc734d",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 214,
      title: "Promotion de -15% sur les jouets",
      companies: [{ id: 12, name: "Edito", logo: "https://server.taoo.ai/api/uploads/07d17edd-92f1-448d-ba42-4e4d0e48e319" }],
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 45.0,
      count: 25,
      remainCount:16,
      premium: true,
      vip: false,
      background: "#f2a069",
      textColor: "",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/f31299e5-144c-430a-b767-e8e1bd87e626",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 102,
      title: "Location Ring Toss",
      companies: [{ id: 13, name: "Moons", logo: "https://server.taoo.ai/api/uploads/2359e625-1596-4e22-8644-fecef9bda0bd" }],
      discountPercentAmount: 0.0,
      discountMoneyAmount: 60.0,
      pointSellPrice: 75.0,
      count: 18,
      remainCount:16,
      premium: true,
      vip: false,
      background: "#232323",
      textColor: "#d58400",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/53675b42-5253-4bb1-b98e-ede5c610138b",
      discountType: "MONEY",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 29,
      title: "-25% Bienvenue chez LEGO Create",
      companies: [{ id: 10, name: "LEGO Create", logo: "https://server.taoo.ai/api/uploads/56a48e83-ddc6-4f00-814f-b38c92e074f6" }],
      discountPercentAmount: 25.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 20.0,
      count: 4,
      remainCount:3,
      premium: true,
      vip: false,
      background: "#d7d0ac",
      textColor: "",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/ebc2ec88-e89a-4d85-b89f-659005059698",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 88,
      title: "Offre Milieu de Semaine",
      companies: [{ id: 22, name: "Flamingo Forest Parcours Aventure", logo: "https://server.taoo.ai/api/uploads/bc080314-69ec-44b9-a183-f52db35fc017" }],
      discountPercentAmount: 20.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 60.0,
      count: 25,
      remainCount:16,
      premium: true,
      vip: false,
      background: "#9ca979",
      textColor: "",
      titleColor: "#fec700",
      thumbnail: "https://server.taoo.ai/api/uploads/2d05b7e5-a681-471a-8d3f-185b3f68348b",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 66,
      title: "Achat de deux paires -50% sur la deuxième paire",
      companies: [{ id: 20, name: "Desa Optic", logo: "https://server.taoo.ai/api/uploads/9e593430-e396-424e-849e-3ef40bdccd4f" }],
      discountPercentAmount: 50.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 110.0,
      count: 23,
      remainCount:16,
      premium: true,
      vip: true,
      background: "#ffee60",
      textColor: "#000000",
      titleColor: "#b03703",
      thumbnail: "https://server.taoo.ai/api/uploads/59225c9f-9a88-4caa-84bc-db890f938c14",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 44,
      title: "-10% sur les fondants et gâteaux délicieux",
      companies: [{ id: 14, name: "Mikui", logo: "https://server.taoo.ai/api/uploads/8af4ada7-b51f-4fcb-914b-da3276ccbc69" }],
      discountPercentAmount: 10.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 25.0,
      count: 69,
      remainCount:66,
      premium: true,
      vip: false,
      background: "#a1bac0",
      textColor: "#ffffff",
      titleColor: "#24292a",
      thumbnail: "https://server.taoo.ai/api/uploads/d3673ba3-1c86-49bb-9e9b-cd502161b72d",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 167,
      title: "Abonnement 1 an",
      companies: [{ id: 38, name: "Arena Gym Premium", logo: "https://server.taoo.ai/api/uploads/69991b89-5a3a-4cf0-968c-177839a84358" }],
      discountPercentAmount: 50.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 80.0,
      count: 66,
      remainCount:66,
      premium: true,
      vip: true,
      background: "#712187",
      textColor: "#ebebeb",
      titleColor: "#f0c413",
      thumbnail: "https://server.taoo.ai/api/uploads/03e5d887-cc21-472e-8d03-9a2ce56b1521",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 00:00:00"
    },
    {
      id: 6,
      title: "Bienvenue à Eye Glow",
      companies: [{ id: 5, name: "Eye Glow Optic", logo: "https://server.taoo.ai/api/uploads/d9f47bd4-c15c-4bd9-8a1c-4d367ff60be7" }],
      discountPercentAmount: 25.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 100.0,
      count: 37,
      remainCount:26,
      premium: true,
      vip: false,
      background: "#0b1d7d",
      textColor: "",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/17b3e31e-7324-4c8b-8ed4-371395f13c2e",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 83,
      title: "Casque Gaming",
      companies: [{ id: 21, name: "SkyMil informatique", logo: "https://server.taoo.ai/api/uploads/23c2b34d-3d07-4d69-bdac-fb60e9ea037a" }],
      discountPercentAmount: 7.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 80.0,
      count: 0,
      remainCount:0,
      premium: true,
      vip: false,
      background: "#6c0e13",
      textColor: "#000000",
      titleColor: "#ffffff",
      thumbnail: "https://server.taoo.ai/api/uploads/f2c221b8-dcff-4c0b-b7e3-1b025db7a2d8",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    },
    {
      id: 118,
      title: "Machine à laver reconditionnée",
      companies: [{ id: 25, name: "WeFix", logo: "https://server.taoo.ai/api/uploads/a30d5f3f-4279-4a03-af90-032f0f86a6fa" }],
      discountPercentAmount: 10.0,
      discountMoneyAmount: 0.0,
      pointSellPrice: 70.0,
      count: 0,
      remainCount:0,
      premium: true,
      vip: false,
      background: "#d8dfd9",
      textColor: "#059b39",
      titleColor: "#444444",
      thumbnail: "https://server.taoo.ai/api/uploads/9d09ce90-d19b-4613-bb3d-6cffae37853b",
      discountType: "PERCENT",
      saleEndAt: "2025-09-30 23:59:00"
    }
  ];

  const handleShowDealDetail = (deal: Deal) => {
    if (onShowDealDetailWithData) {
      onShowDealDetailWithData(deal);
    } else if (onShowDealDetail) {
      onShowDealDetail();
    }
  };

  // Categorize deals
  const restaurantDeals = dealsData.filter(deal => 
    ['Friends Pasta Bar', 'Mikui', 'Restaurant losquallo', 'Bfries', 'Avocado Bar', 'Sakura Pasta'].includes(deal.companies[0]?.name)
  );

  const sportDeals = dealsData.filter(deal => 
    ['Urban Dance', 'Flamingo Forest Parcours Aventure', 'Arena Gym Premium', 'Slim Fit'].includes(deal.companies[0]?.name)
  );

  const opticDeals = dealsData.filter(deal => 
    ['Desa Optic', 'Eye Glow Optic', 'Optic coral', 'Optic Pasteur', 'Point de vue - Menzah 6', 'Slim Optique'].includes(deal.companies[0]?.name)
  );

  const techDeals = dealsData.filter(deal => 
    ['SkyMil informatique', 'WeFix', 'Game ON', 'The Game Production'].includes(deal.companies[0]?.name)
  );

  const educationDeals = dealsData.filter(deal => 
    ['LEGO Create', 'Edito', 'Your Zone Academy', 'Librairie L\'elite'].includes(deal.companies[0]?.name)
  );

  const entertainmentDeals = dealsData.filter(deal => 
    ['Moons', 'Escape room', 'Houdou Yoga Space'].includes(deal.companies[0]?.name)
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header points={currentUser.points} onAccountClick={onAccountClick} onPointsClick={onShowUpgradeAccount} />
      
      <div className="px-4 py-4 space-y-6">
        {/* Upgrade Account Level Header */}
        {userLevel === 'basic' && (<div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <h2 className="font-bold text-lg mb-2 dark:text-white">Upgrade Your Account Level</h2>
          <p className="text-sm text-purple-100 mb-3">
            Unlock premium deals and exclusive offers! Upgrade to Silver or Gold to access all premium content.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Current: Basic</span>
              <span className="text-xs text-purple-200">→ Silver/Gold</span>
            </div>
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors">
              <button 
                onClick={onShowUpgradeAccount}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors"
              >
                Upgrade Now
              </button>
            </button>
          </div>
        </div>)}

        {/* À la une */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">À la une</h3>
            <button 
              onClick={() => handleShowDealDetail(dealsData[0])}
              className="text-blue-500 text-sm"
            >
              Tout voir
            </button>
          </div>
          <button 
            onClick={() => handleShowDealDetail(dealsData[0])}
            className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg p-4 h-32 relative hover:scale-105 transition-transform"
          >
            <div className="absolute top-2 left-2 bg-yellow-400 px-2 py-1 rounded-full">
              <span className="text-xs font-bold text-gray-900">35 pts</span>
            </div>
            <div className="absolute bottom-2 left-2">
              <div className="text-lg font-bold text-gray-800">Friends Pasta Bar</div>
              <div className="text-sm text-gray-600">Offre de Bienvenue</div>
            </div>
          </button>
        </section>

        <DealSection title="Restaurants & Gastronomie 🍽️" deals={restaurantDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
        <DealSection title="Sport & Fitness 💪" deals={sportDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
        <DealSection title="Optique & Vision 👓" deals={opticDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
        <DealSection title="Technologie & Gaming 🎮" deals={techDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
        <DealSection title="Éducation & Loisirs 📚" deals={educationDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
        <DealSection title="Divertissement & Détente 🎯" deals={entertainmentDeals} onShowDetail={handleShowDealDetail} userLevel={userLevel} />
      </div>
    </div>
  );
}