import React from 'react';
import { Crown, Star, Gift, Zap, Target, TrendingUp, Smartphone, CreditCard } from 'lucide-react';

interface LevelDetailsProps {
  currentLevel: 'basic' | 'silver' | 'gold';
  currentPoints: number;
  nextLevelPoints: number;
  accountAge: number;
}

export default function LevelDetails({ currentLevel, currentPoints, nextLevelPoints, accountAge }: LevelDetailsProps) {
  const progressPercentage = (currentPoints / nextLevelPoints) * 100;
  const pointsNeeded = nextLevelPoints - currentPoints;

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'basic':
        return {
          name: 'Basic',
          color: 'from-amber-600 to-amber-700',
          bgColor: 'bg-amber-600',
          textColor: 'text-amber-500',
          number: 1,
          nextLevel: 'Silver'
        };
      case 'silver':
        return {
          name: 'Silver',
          color: 'from-gray-400 to-gray-500',
          bgColor: 'bg-gray-400',
          textColor: 'text-gray-400',
          number: 2,
          nextLevel: 'Gold'
        };
      case 'gold':
        return {
          name: 'Gold',
          color: 'from-yellow-400 to-yellow-500',
          bgColor: 'bg-yellow-400',
          textColor: 'text-yellow-400',
          number: 3,
          nextLevel: 'Platinum'
        };
      default:
        return {
          name: 'Basic',
          color: 'from-amber-600 to-amber-700',
          bgColor: 'bg-amber-600',
          textColor: 'text-amber-500',
          number: 1,
          nextLevel: 'Silver'
        };
    }
  };

  const getCurrentLevelBenefits = (level: string) => {
    switch (level) {
      case 'basic':
        return [
          { icon: Star, title: 'Points sur achats', description: '1 SAR = 10 points', active: true },
          { icon: Gift, title: 'Parrainage', description: '50 points par ami', active: true },
          { icon: Target, title: 'Connexion quotidienne', description: '10 points par jour', active: true },
        ];
      case 'silver':
        return [
          { icon: Star, title: 'Points sur achats', description: '1 SAR = 15 points', active: true },
          { icon: Gift, title: 'Parrainage', description: '50 points par ami', active: true },
          { icon: Target, title: 'Connexion quotidienne', description: '15 points par jour', active: true },
          { icon: CreditCard, title: 'Paiement fractionné', description: 'Jusqu\'à 6 mensualités', active: true },
          { icon: Smartphone, title: 'Abonnement mobile', description: '10.50 SAR/mois', active: true },
        ];
      case 'gold':
        return [
          { icon: Star, title: 'Points sur achats', description: '1 SAR = 20 points', active: true },
          { icon: Gift, title: 'Parrainage', description: '100 points par ami', active: true },
          { icon: Target, title: 'Connexion quotidienne', description: '20 points par jour', active: true },
          { icon: CreditCard, title: 'Paiement fractionné', description: 'Jusqu\'à 6 mensualités', active: true },
          { icon: Smartphone, title: 'Abonnement mobile', description: '19.50 SAR/mois', active: true },
        ];
      default:
        return [];
    }
  };

  const getNextLevelBenefits = (currentLevel: string) => {
    switch (currentLevel) {
      case 'basic':
        return [
          'Points sur achats: 1 SAR = 15 points',
          'Paiement fractionné jusqu\'à 6 mois',
          'Abonnement mobile quotidien',
          'Connexion quotidienne: 15 points'
        ];
      case 'silver':
        return [
          'Points sur achats: 1 SAR = 20 points',
          'Parrainage: 100 points par ami',
          'Connexion quotidienne: 20 points',
          'Abonnement mobile amélioré: 19.50 SAR/mois'
        ];
      case 'gold':
        return [
          'Accès aux ventes privées exclusives',
          'Support client prioritaire 24/7',
          'Cashback bonus supplémentaire',
          'Conseiller personnel dédié'
        ];
      default:
        return [];
    }
  };

  const levelInfo = getLevelInfo(currentLevel);
  const currentBenefits = getCurrentLevelBenefits(currentLevel);
  const nextLevelBenefits = getNextLevelBenefits(currentLevel);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className={`bg-gradient-to-r ${levelInfo.color} p-6`}>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border-4 border-white">
              <Crown className={`w-10 h-10 ${levelInfo.textColor}`} />
            </div>
            <div className="absolute -top-2 -right-2 bg-white text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
              {levelInfo.number}
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-2">Niveau {levelInfo.name}</h1>
        <p className="text-center text-white/80">Membre depuis {accountAge} jours</p>
      </div>

      {/* Progress Section */}
      <div className="p-6">
        {currentLevel !== 'gold' && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Progression vers {levelInfo.nextLevel}</span>
              <span className={`${levelInfo.textColor} font-bold`}>{Math.round(progressPercentage)}%</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className={`bg-gradient-to-r ${levelInfo.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentPoints.toLocaleString()} points</span>
              <span>{nextLevelPoints.toLocaleString()} points</span>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-yellow-500 font-semibold">
                  Plus que {pointsNeeded.toLocaleString()} points pour le niveau {levelInfo.nextLevel} !
                </span>
              </div>
            </div>
          </div>
        )}

        {currentLevel === 'gold' && (
          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-6 mb-6 border border-yellow-400/30">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-12 h-12 text-yellow-400 mr-3" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-yellow-400">Niveau Maximum Atteint!</h2>
                <p className="text-yellow-300">Vous avez débloqué tous les avantages</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Level Benefits */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Vos avantages {levelInfo.name}</h2>
          <div className="space-y-3">
            {currentBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center p-4 rounded-lg bg-green-900/30 border border-green-500/30"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${levelInfo.bgColor}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Level Preview */}
        {currentLevel !== 'gold' && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Débloquez au Niveau {levelInfo.nextLevel}</h2>
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/20">
              <div className="flex items-center mb-4">
                <Crown className="w-8 h-8 text-yellow-500 mr-3" />
                <span className="text-xl font-bold text-yellow-500">Niveau {levelInfo.nextLevel}</span>
              </div>
              <div className="space-y-2">
                {nextLevelBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tips to Earn Points */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Comment gagner plus de points</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span>Achats chez nos partenaires</span>
              <span className={`${levelInfo.textColor} font-semibold`}>
                {currentLevel === 'bronze' ? '+10 pts/SAR' : 
                 currentLevel === 'silver' ? '+15 pts/SAR' : '+20 pts/SAR'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span>Parrainage d'amis</span>
              <span className={`${levelInfo.textColor} font-semibold`}>
                {currentLevel === 'gold' ? '+100 pts' : '+50 pts'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span>Connexion quotidienne</span>
              <span className={`${levelInfo.textColor} font-semibold`}>
                {currentLevel === 'bronze' ? '+10 pts' : 
                 currentLevel === 'silver' ? '+15 pts' : '+20 pts'}
              </span>
            </div>
            {(currentLevel === 'silver' || currentLevel === 'gold') && (
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span>Abonnement mobile quotidien</span>
                <span className={`${levelInfo.textColor} font-semibold`}>
                  {currentLevel === 'silver' ? '10.50 SAR/mois' : '19.50 SAR/mois'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}