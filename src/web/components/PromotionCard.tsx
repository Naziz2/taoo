import React from 'react';

interface PromotionCardProps {
  title: string;
  thumbnail: string;
  discount: string;
  bgColor: string;
  textColor?: string;
}

export default function PromotionCard({ title,thumbnail, discount, bgColor, textColor = 'text-gray-800' }: PromotionCardProps) {
  return (
    <div className={`${bgColor}  rounded-xl p-6 h-48 flex flex-col justify-end relative overflow-hidden`}   style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="relative z-10">
        <h3 className={`font-semibold text-lg ${textColor}`}>{discount}</h3>
      </div>
    </div>
  );
}