import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CreditCard, MapPin, Settings, Eye } from 'lucide-react';

interface PluxeePageProps {
  onBack: () => void;
  currentUser?: any;
  onShowUpgradeAccount?: () => void;
}

export default function PluxeePage({ onBack,currentUser,onShowUpgradeAccount }: PluxeePageProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const cards = [
    {
      type: 'Repas',
      balance: '38,650',
      currency: 'DT',
      cardNumber: '3030 XXXX XXXX 4038',
      bgColor: 'bg-gradient-to-br from-green-400 to-green-500',
      thumbnail: "https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/repas%20cheque%20maroc.jpg.webp?itok=LFKLaX2e",
      textColor: 'text-white'
    },
    {
      type: 'Cadeau',
      balance: '12,450',
      currency: 'DT', 
      cardNumber: '3030 XXXX XXXX 5621',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      thumbnail: 'https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk',
      textColor: 'text-white'
    },
    {
      type: 'Habillement',
      balance: '2,450',
      currency: 'DT', 
      cardNumber: '3030 XXXX XXXX 5621',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
      thumbnail: "https://www.pluxee.tn/sites/g/files/jclxxe421/files/styles/plx_cards_main_products/public/2024-12/cheque%20format%20site.jpg.webp?itok=SihcKxBk",
      textColor: 'text-white'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'Achat',
      amount: '- 8.000 DT',
      amountValue: 8.000,
      date: '20.1.2025 14:45',
      merchant: 'COMMERÇANT',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Achat',
      amount: '- 15.500 DT',
      amountValue: 15.500,
      date: '19.1.2025 12:30',
      merchant: 'RESTAURANT',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Achat',
      amount: '- 25.000 DT',
      amountValue: 25.000,
      date: '18.1.2025 18:20',
      merchant: 'SUPERMARCHÉ',
      status: 'completed'
    }
  ];

  const currentCard = cards[currentCardIndex];

  // Calculate points earned (3% of transaction amount)
  const calculatePoints = (amount: number) => {
    return Math.floor(amount * 0.003 * 100); // 3% converted to points (assuming 1 TND = 100 points)
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-500 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <img 
              src="/pluxee-logo.png" 
              alt="Pluxee" 
              className="h-8 w-auto"
            />
          </div>
          <button 
          className="flex items-center bg-yellow-100 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-gray-800">{currentUser?.points.toLocaleString()}</span>
          <span className="ml-1 text-yellow-600">
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </span>
        </button>
        </div>
      </div>

      <div className="p-4 space-y-6" style={{ backgroundColor: 'rgba(34,28,70,1)' }}>
        {/* Card Section */}
        <div className="relative">
          <div className={`${currentCard.bgColor} ${currentCard.textColor} rounded-2xl p-6 shadow-lg`}>
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-semibold text-lg">{currentCard.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">pluxee</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                {currentCard.balance} {currentCard.currency}
              </div>
              <div className="text-sm opacity-80">
                NOM DE L'UTILISATEUR
              </div>
            </div>
            
            <div className="text-sm opacity-80 font-mono">
              {currentCard.cardNumber}
            </div>
          </div>

          {/* Card Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCardIndex ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Historique</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Voir tout
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{transaction.type}</div>
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                      <div className="text-xs text-gray-400">{transaction.merchant}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">{transaction.amount}</div>
                    <div className="text-xs text-green-600 font-medium">
                      +{calculatePoints(transaction.amountValue)} pts
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-lg">Gestion du compte</span>
          </div>
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}