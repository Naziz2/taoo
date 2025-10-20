import React from 'react';
import { ChevronLeft, Wallet, TrendingUp, Gift, Plus, Minus } from 'lucide-react';

interface WalletDetailsPageProps {
  onBack: () => void;
}

export default function WalletDetailsPage({ onBack }: WalletDetailsPageProps) {
  const currentPoints = 13614;
  const monthlyLimit = 2000;
  const usedThisMonth = 650;
  const availableLimit = monthlyLimit - usedThisMonth;
  const limitPercentage = (usedThisMonth / monthlyLimit) * 100;

  const recentTransactions = [
    { type: 'earned', merchant: 'H&M', points: 25, date: '2024-01-15' },
    { type: 'redeemed', merchant: 'Gift Card', points: -500, date: '2024-01-12' },
    { type: 'earned', merchant: 'TunisiaNet', points: 80, date: '2024-01-10' },
    { type: 'earned', merchant: 'Decathlon', points: 30, date: '2024-01-08' },
    { type: 'redeemed', merchant: 'Mango Voucher', points: -200, date: '2024-01-05' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Mon portefeuille</h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">{currentPoints.toLocaleString()}</span>
            <span className="ml-1 text-yellow-600"><img src="/Image+Background.png" alt="🪙" width={16} height={16} /></span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Balance */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-gray-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Points disponibles</h2>
              <div className="text-3xl font-bold">{currentPoints.toLocaleString()}</div>
            </div>
            <Wallet className="w-12 h-12 text-gray-800" />
          </div>
          <div className="text-sm opacity-80">
            1 Point = 1 TND • Gagnez des points à chaque achat
          </div>
        </div>

        {/* Monthly Limit */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Limite mensuelle</h3>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Utilisé ce mois</span>
              <span>{usedThisMonth} / {monthlyLimit} TND</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${limitPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-xl font-bold text-green-600">{availableLimit}</div>
              <div className="text-sm text-green-600">Disponible</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-xl font-bold text-blue-600">6</div>
              <div className="text-sm text-blue-600">Mois max</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h3>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'earned' ? (
                      <Plus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{transaction.merchant}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.points > 0 ? '+' : ''}{transaction.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Earning Tips */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Comment gagner plus de points</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex justify-between">
              <span>• Achats chez nos partenaires</span>
              <span className="font-medium">15 pts/TND (Silver)</span>
            </div>
            <div className="flex justify-between">
              <span>• Parrainage d'amis</span>
              <span className="font-medium">50 points</span>
            </div>
            <div className="flex justify-between">
              <span>• Connexion quotidienne</span>
              <span className="font-medium">15 points</span>
            </div>
            <div className="flex justify-between">
              <span>• Abonnement mobile</span>
              <span className="font-medium">10.50 DT/mois</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}