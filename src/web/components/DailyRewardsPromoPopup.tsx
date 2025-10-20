import React, { useState } from 'react';
import { X, Gift, Star, Trophy, Calendar } from 'lucide-react';

interface DailyRewardsPromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayNow: () => void;
}

export default function DailyRewardsPromoPopup({ isOpen, onClose, onPlayNow }: DailyRewardsPromoPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header with Gradient */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6 text-white relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-5 rounded-full translate-y-8 -translate-x-8"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-gray-900" />
            </div>
            <h2 className="text-xl font-bold mb-2">Bienvenue chez TAOO!</h2>
            <p className="text-sm opacity-90">Découvrez notre roue de la fortune quotidienne</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mini Wheel Preview */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div 
                className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg relative overflow-hidden"
                style={{ 
                  background: 'conic-gradient(from 0deg, #ff6b6b 0deg 51.43deg, #4ecdc4 51.43deg 102.86deg, #45b7d1 102.86deg 154.29deg, #f9ca24 154.29deg 205.72deg, #f0932b 205.72deg 257.15deg, #eb4d4b 257.15deg 308.58deg, #6c5ce7 308.58deg 360deg)'
                }}
              >
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
                  </div>
                </div>
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                <div className="w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-gray-600"></div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">Gagnez jusqu'à 500 points</h3>
            <p className="text-gray-600 text-sm">Tournez la roue chaque jour pour gagner des points</p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-gray-700 text-sm">Jouez gratuitement chaque jour</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-700 text-sm">7 jours consécutifs = Grand Prix</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Trophy className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-gray-700 text-sm">Cadeau spécial après 7 jours</span>
            </div>
          </div>

          {/* 7-Day Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-center">Progression sur 7 jours</h4>
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                <React.Fragment key={day}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    day === 7 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {day === 7 ? '🎁' : day}
                  </div>
                  {index < 6 && (
                    <div className="flex-1 h-1 mx-1 bg-gray-300"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onPlayNow}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center">
                <Gift className="w-5 h-5 mr-2" />
                Commencer à jouer
              </div>
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}