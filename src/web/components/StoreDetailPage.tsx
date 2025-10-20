 import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, X , Smartphone, Send, CreditCard, Banknote, Users, Zap, Shield, Check, AlertCircle, Loader } from 'lucide-react';

interface StoreDetailPageProps {
  currentUser?: any;
  store?:any;
  onBack: () => void;
}

export default function StoreDetailPage({ currentUser,store, onBack }: StoreDetailPageProps) {
    const iframeRef = useRef(null);
    const [iframeDimensions, setIframeDimensions] = useState({ height: 'auto', width: '100%' });

    useEffect(() => {
        const handleMessage = (event) => {
            // Ensure the message origin is trusted for security
            if (event.origin !== store.domain) {
                return;
            }
            if (event.data && event.data.height && event.data.width) {
                setIframeDimensions({ height: `${event.data.height}px`, width: `${event.data.width}px` });
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    useEffect(() => {
        // Set iframe height to window height minus header height (72px)
        const iframe = document.querySelector("iframe");
        if (iframe) {
            iframe.style.height = (window.innerHeight - 72) + "px";
        }
    }, []);

  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">{store.name}</h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">{currentUser.points}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>
      </div>

      <iframe
          ref={iframeRef}
          src={store.url}
          title={store.name}
          style={{ height: iframeDimensions.height, width: iframeDimensions.width }}
        />
    </div>
  );
}