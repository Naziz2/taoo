import React from 'react';

interface GiftCardProps {
  thumbnail: string;
  amount: string;
  points: number;
  quantity: number;
  bgColor: string;
}

export default function GiftCard({ thumbnail, amount, points, quantity, bgColor }: GiftCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-4 h-32 relative overflow-hidden`} style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: "cover" , backgroundPosition: "center center" }}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs bg-white/90 px-2 py-1 rounded">Quantity: {quantity}</span>
        <div className="flex items-center">
          <span className="text-sm font-bold">{points}</span>
          <span className="ml-1 text-yellow-600">
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </span>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="text-2xl font-bold text-white">{amount}</div>
      </div>
      <div className="text-xs text-gray-700 mt-8">Pluxee</div>
    </div>
  );
}