import React, { useState, useEffect } from 'react';
import { ChevronLeft, QrCode, Camera, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface QRScannerPageProps {
  onBack: () => void;
  onOrderCreated: (orderData: any) => void;
}

interface ScannedPartner {
  id: string;
  name: string;
  logo: string;
  location: string;
  cashbackRate: number;
}

interface OrderData {
  orderId: string;
  partnerId: string;
  partnerName: string;
  qrCode: string;
  expiresAt: string;
  amount?: number;
}

export default function QRScannerPage({ onBack, onOrderCreated }: QRScannerPageProps) {
  const [scanStep, setScanStep] = useState<'scanning' | 'partner_confirmed' | 'generating' | 'order_ready'>('scanning');
  const [scannedPartner, setScannedPartner] = useState<ScannedPartner | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulate QR code scanning
  const simulatePartnerScan = () => {
    // Simulate scanning delay
    setTimeout(() => {
      const mockPartner: ScannedPartner = {
        id: 'partner_001',
        name: 'Friends Pasta Bar',
        logo: 'https://server.taoo.ai/api/uploads/9e8d2ee5-3d5c-477c-a490-6ca75e293aab',
        location: 'L\'Aouina, Tunisia',
        cashbackRate: 15
      };
      
      setScannedPartner(mockPartner);
      setScanStep('partner_confirmed');
    }, 2000);
  };

  // Generate order QR code
  const generateOrderQR = async () => {
    if (!scannedPartner) return;
    
    setScanStep('generating');
    setError(null);

    try {
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockOrderData: OrderData = {
        orderId: `ORD-${Date.now()}`,
        partnerId: scannedPartner.id,
        partnerName: scannedPartner.name,
        qrCode: `TAOO-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      };
      
      setOrderData(mockOrderData);
      setScanStep('order_ready');
      
    } catch (err) {
      setError('Failed to generate order QR code. Please try again.');
      setScanStep('partner_confirmed');
    }
  };

  // Auto-start scanning simulation
  useEffect(() => {
    if (scanStep === 'scanning') {
      simulatePartnerScan();
    }
  }, [scanStep]);

  const handleProceedToCheckout = () => {
    if (orderData) {
      onOrderCreated(orderData);
    }
  };

  const renderScanningStep = () => (
    <div className="text-center">
      <div className="w-64 h-64 mx-auto mb-6 border-4 border-dashed border-yellow-400 rounded-xl flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <Camera className="w-16 h-16 text-yellow-600 mx-auto mb-4 animate-pulse" />
          <p className="text-yellow-700 font-medium">Scanning Partner QR Code...</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">Scan Partner QR Code</h2>
      <p className="text-gray-600 mb-6">
        Point your camera at the partner's QR code to start your order
      </p>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <QrCode className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">How it works:</p>
            <p>1. Scan the partner's QR code at their location</p>
            <p>2. We'll generate your unique order QR code</p>
            <p>3. Partner scans your code to create the order</p>
            <p>4. Proceed to checkout and earn points!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPartnerConfirmed = () => (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">Partner Confirmed!</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            {scannedPartner?.logo ? (
              <img 
                src={scannedPartner.logo} 
                alt={scannedPartner.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <QrCode className="w-8 h-8 text-gray-600" />
            )}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800">{scannedPartner?.name}</h3>
            <p className="text-sm text-gray-600">{scannedPartner?.location}</p>
            <div className="bg-yellow-100 px-2 py-1 rounded-full mt-1">
              <span className="text-xs font-medium text-yellow-800">
                {scannedPartner?.cashbackRate}% cashback
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={generateOrderQR}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors"
      >
        Generate My Order QR Code
      </button>
    </div>
  );

  const renderGenerating = () => (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">Generating Your QR Code</h2>
      <p className="text-gray-600 mb-6">
        Please wait while we create your unique order QR code...
      </p>
      
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderReady = () => (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <QrCode className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">Your Order QR Code is Ready!</h2>
      <p className="text-gray-600 mb-6">
        Show this QR code to the partner to create your order
      </p>
      
      {orderData && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          {/* QR Code Display */}
          <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-300">
            <div className="text-center">
              <div className="w-40 h-40 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center mb-2">
                <div className="text-xs font-mono break-all p-2 text-center">
                  {orderData.qrCode}
                </div>
              </div>
              <p className="text-xs text-gray-600">Order QR Code</p>
            </div>
          </div>
          
          {/* Order Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono text-sm font-bold text-gray-800">{orderData.orderId}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Partner</span>
              <span className="font-bold text-gray-800">{orderData.partnerName}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Expires</span>
              <span className="font-bold text-orange-600">
                {new Date(orderData.expiresAt).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <button
          onClick={handleProceedToCheckout}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors"
        >
          Partner Will Scan & Create Order
        </button>
        
        <button
          onClick={onBack}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"
        >
          Cancel Order
        </button>
      </div>
      
      <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-orange-700">
            <p className="font-medium mb-1">Important:</p>
            <p>This QR code expires in 10 minutes. Please show it to the partner promptly to create your order.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Scan & Order</h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">13,614</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {scanStep === 'scanning' && renderScanningStep()}
        {scanStep === 'partner_confirmed' && renderPartnerConfirmed()}
        {scanStep === 'generating' && renderGenerating()}
        {scanStep === 'order_ready' && renderOrderReady()}
      </div>
    </div>
  );
}