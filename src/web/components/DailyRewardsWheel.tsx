import React, { useState, useEffect } from 'react';
import { Gift, Star,CreditCard, Zap, Crown, Calendar,X, Trophy,Smartphone,TrendingUp } from 'lucide-react';

interface DailyRewardsWheelProps {
  isOpen: boolean;
  currentUser?: any;
  onClose: () => void;
  onPlayGame?: () => void;
  onShowUpgradeAccount?: () => void;
  onPlayNow?: () => void;
}

interface WheelSegment {
  value: number;
  color: string;
  textColor: string;
  angle: number;
}

export default function DailyRewardsWheel({isOpen, currentUser, onClose, onPlayGame, onShowUpgradeAccount, onPlayNow }: DailyRewardsWheelProps) {
  if(!isOpen) return null;
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentDay, setCurrentDay] = useState(Math.floor(Math.random() * 7) + 1); // User has completed 2 days
  const [canPlay, setCanPlay] = useState(true);
  const [lastPlayDate, setLastPlayDate] = useState<string | null>(null);

  // Wheel segments with point values
  const segments: WheelSegment[] = [
    { value: 1, color: '#ff6b6b', textColor: '#ffffff', angle: 0 },
    { value: 5, color: '#4ecdc4', textColor: '#ffffff', angle: 51.43 },
    { value: 10, color: '#45b7d1', textColor: '#ffffff', angle: 102.86 },
    { value: 20, color: '#f9ca24', textColor: '#2c2c2c', angle: 154.29 },
    { value: 50, color: '#f0932b', textColor: '#ffffff', angle: 205.72 },
    { value: 100, color: '#eb4d4b', textColor: '#ffffff', angle: 257.15 },
    { value: 500, color: '#6c5ce7', textColor: '#ffffff', angle: 308.58 }
  ];

  // Check if user can play today
  useEffect(() => {
    const today = new Date().toDateString();
    const canPlayToday = lastPlayDate !== today;
    setCanPlay(canPlayToday);
  }, [lastPlayDate]);

  const handleSpin = () => {
    if (!canPlay || isSpinning) return;

    setIsSpinning(true);
    
    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const randomRotation = 1440 + Math.random() * 720;
    setRotation(prev => prev + randomRotation);

    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
      
      // Determine winning segment
      const normalizedRotation = (rotation + randomRotation) % 360;
      const segmentAngle = 360 / segments.length;
      const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
      const winningPoints = segments[winningIndex].value;
      
      // Update user points and play status
      if (currentUser && onPlayGame) {
        onPlayGame();
      }
      
      // Set last play date to today
      setLastPlayDate(new Date().toDateString());
      setCanPlay(false);
      
    }, 3000);
  };
  const billingCycle='daily';
  const levels: AccountLevel[] = [
    {
      name: 'basic',
      displayName: 'Basic',
      color: 'text-orange-400',
      bgGradient: 'from-orange-300 to-orange-400',
      price: 'Gratuit',
      originalPrice:  undefined,
      popular: true,
      pointsPerSAR: 10,
      referralPoints: 10,
      dailyCheckinPoints: 1,
      maxInstallments: 0,
      mobileSubscription: 'Aucun abonnement',
      benefits: [
        {
          icon: Star,
          title: 'Cashback Standard',
          description: '10 points/SAR Cashback • Offres limitées',
          highlight: true
        },
        {
          icon: CreditCard,
          title: 'Paiement en ligne',
          description: 'Paiement en ligne avec Wallet Flouci',
          highlight: true
        },
        {
          icon: Smartphone,
          title: 'Abonnement mobile',
          description: 'Gratuit',
          highlight: true
        },
        {
          icon: Zap,
          title: 'Connexion quotidienne',
          description: '1 points par jours'
        }
        ]
    },
    {
      name: 'silver',
      displayName: 'Silver',
      color: 'text-gray-400',
      bgGradient: 'from-gray-300 to-gray-400',
      price: billingCycle === 'daily' ? '0.500' : '2.900',
      originalPrice: billingCycle === 'monthly' ? '10.500' : undefined,
      popular: true,
      pointsPerSAR: 12,
      referralPoints: 20,
      dailyCheckinPoints: 5,
      maxInstallments: 6,
      mobileSubscription: '0.500 SAR/jour, 2.900 SAR/semaine, 10.500 SAR/mois',
      benefits: [
        {
          icon: Star,
          title: 'Cashback Supplémentaire',
          description: '12 points SAR cashback (20% de plus qu\'avec l\'offre Basic)',
          highlight: true
        },
        {
          icon: CreditCard,
          title: 'Paiement fractionné',
          description: 'Jusqu\'à 6 mensualités sans frais',
          highlight: true
        },
        {
          icon: Smartphone,
          title: 'Abonnement mobile',
          description: '0.500 SAR/jour, 2.900 SAR/semaine, 10.500 SAR/mois',
          highlight: true
        },
        {
          icon: Gift,
          title: 'Offres premium',
          description: 'Accès à toutes les offres premium',
          highlight: true
        },
        {
          icon: Zap,
          title: 'Connexion quotidienne',
          description: '5 points par jours'
        },
        {
          icon: TrendingUp,
          title: 'Limite mensuelle étendue',
          description: 'Limite d\'achat mensuelle augmentée'
        }
      ]
    },
    {
      name: 'gold',
      displayName: 'Gold',
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-400 to-yellow-500',
      price: billingCycle === 'daily' ? '0.900' : '5.200',
      originalPrice: billingCycle === 'monthly' ? '19.500' : undefined,
      pointsPerSAR: 15,
      referralPoints: 40,
      dailyCheckinPoints: 7,
      maxInstallments: 6,
      mobileSubscription: '0.900 SAR/jour, 5.200 SAR/semaine, 19.500 SAR/mois',
      benefits: [
        {
          icon: Star,
          title: 'Points maximum',
          description: '15 points SAR cashback (50% de plus qu\'avec l\'offre Basic)',
          highlight: true
        },
        {
          icon: Gift,
          title: 'Parrainage doublé',
          description: '40 points par ami parrainé',
          highlight: true
        },
        {
          icon: Crown,
          title: 'Accès VIP exclusif',
          description: 'Ventes privées et offres exclusives',
          highlight: true
        },
        {
          icon: Smartphone,
          title: 'Abonnement mobile premium',
          description: '0.900 SAR/jour, 5.200 SAR/semaine, 19.500 SAR/mois',
          highlight: true
        },
        {
          icon: Zap,
          title: 'Connexion quotidienne',
          description: '7 points par jour'
        },
        {
          icon: CreditCard,
          title: 'Paiement fractionné étendu',
          description: 'Jusqu\'à 6 mensualités + conditions préférentielles'
        }
      ]
    }
  ];

  const currentUserLevel = levels.find(level => level.name === currentUser?.level);
  const getDayStatus = (day: number) => {
    if (day <= currentDay) return 'completed';
    if (day === currentDay + 1) return 'current';
    return 'locked';
  };

  const getDayIcon = (day: number) => {
    const status = getDayStatus(day);
    if (status === 'completed') return '✓';
    if (day === 7) return '🎁';
    return day.toString();
  };

  const getDayColor = (day: number) => {
    const status = getDayStatus(day);
    switch (status) {
      case 'completed': return 'bg-yellow-400 text-gray-900';
      case 'current': return 'bg-white text-gray-900 border-2 border-yellow-400';
      case 'locked': return 'bg-gray-600 text-gray-300';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-gray-400 via-gray-700  to-gray-500 rounded-2xl p-6 mx-4 my-4 relative overflow-hidden hover:scale-105 transition-transform cursor-pointer"
      style={{ 
        backgroundImage: 'url(/daily-rewards-bg-img.png)', 
        backgroundColor: 'gray',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
           {currentDay!=7 && (<div className="flex-1">
            <h2 className="text-white text-xl font-bold mb-1">
              Récompense quotidienne
            </h2>
            <h3 className="text-white text-lg mb-1">
              vous avez reçu
            </h3>
            <div className="flex items-center mb-3">
              <span className="text-white text-3xl font-bold mr-2">+ {currentUserLevel.dailyCheckinPoints}</span>
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <img src="/Image+Background.png" alt="🪙" width={20} height={20} />
              </div>
            </div>
          </div>)}
          
            {currentDay==7 && (<button
              onClick={onPlayNow} 
              className="flex-1">
            <h2 className="text-white text-xl font-bold mb-1">
              Bravo!
            </h2>
            <h3 className="text-white text-lg mb-1">
              Récompense pour votre série de 7 jours
            </h3>
            <div className="flex items-center mb-3">
              <span className="text-white text-3xl font-bold mr-2">2000</span>
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <img src="/Image+Background.png" alt="🪙" width={20} height={20} />
              </div>
            </div>
            <div
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold shadow-lg">
              Tournez la roue
          </div>
            </button>)}

          {/* Wheel of Fortune */}
          <div className="relative">
            <div className="w-32 h-32 relative">
              {/* Wheel container */}
              <img src="/mask-group-1.png" width={128} height={128} />
              
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white"></div>
              </div>
            </div>

            {/* Gift box decoration */}
            <div className="absolute -bottom-2 -right-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Progress */}
        {currentDay!=7 && (<div className="bg-black bg-opacity-20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold text-sm">
              Plus que <span className="text-yellow-400 font-bold">{7 - currentDay} jours</span> pour accéder au GRAND PRIX
            </span>
          </div>
          
          {/* Progress Chain */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
              <React.Fragment key={day}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${getDayColor(day)} ${
                  day === 7 ? 'animate-pulse' : ''
                }`}>
                  {getDayIcon(day)}
                </div>
                {index < 6 && (
                  <div className={`flex-1 h-1 mx-1 ${
                    day <= currentDay ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Grand Prize Info */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-gray-900 mr-1" />
              <span className="text-gray-900 font-bold text-xs">GRAND PRIX: jusqu'à 2000 pts</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}