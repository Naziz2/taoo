import React from 'react';

interface PartnerStoreProps {
  name: string;
  logo: string;
  bgColor: string;
  storeUrl?: string;
  onShowStoreDetail?:(store: any) => void;
}

export default function PartnerStore({ name, logo, bgColor, storeUrl,onShowStoreDetail }: PartnerStoreProps) {
  const handleStoreClick = () => {
    if (!storeUrl) return;
    
    // Add TAOO tracking parameters
    const trackingParams = new URLSearchParams({
      utm_source: 'taoo',
      utm_medium: 'mobile_app',
      utm_campaign: 'partner_store_home',
      utm_content: name.toLowerCase().replace(/\s+/g, '_'),
      taoo_user_id: 'user_13614',
      taoo_store: name.toLowerCase().replace(/\s+/g, '_'),
      taoo_timestamp: Date.now().toString()
    });
    
    const trackedUrl = `${storeUrl}?${trackingParams.toString()}`;
    const storedata = {name: name,url:trackedUrl,domain:storeUrl};
    onShowStoreDetail(storedata);
    //window.open(trackedUrl, '_blank');
  };

  return (
    <button 
      onClick={handleStoreClick}
      className="flex flex-col items-center hover:scale-105 transition-transform"
      disabled={!storeUrl}
    >
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-2 shadow-md`}>
        <span className="text-white font-bold text-lg">{logo}</span>
      </div>
      <span className="text-sm text-gray-600 text-center">{name}</span>
    </button>
  );
}