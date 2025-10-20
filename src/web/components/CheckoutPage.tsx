import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutPageProps {
  onBack: () => void;
  currentUser?: any;
  orderData?: {
    orderId: string;
    partnerId: string;
    partnerName: string;
    qrCode: string;
    expiresAt: string;
    amount?: number;
  };
}

export default function CheckoutPage({ onBack,currentUser, orderData }: CheckoutPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'split' | 'full'>(() => {
    return currentUser?.level === 'basic' ? 'full' : 'split';
  });
  const [splitMonths, setSplitMonths] = useState(4);
  
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: orderData ? `Order at ${orderData.partnerName}` : 'AirPods',
      price: orderData?.amount || 300,
      quantity: orderData?.count || 1,
      image:  '🛍️' 
    }
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const monthlyPayment = totalAmount / splitMonths;
  const pointsForSplit = Math.floor(totalAmount * 0.2); // 1TND=10 points and 2% cashback for split
  const pointsForFull = currentUser?.level === 'silver' ? Math.floor(pointsForSplit * 1.2) : (currentUser?.level === 'gold' ? Math.floor(pointsForSplit * 1.5) : pointsForSplit); // 17% points for full payment

  const splitOptions = [
    { months: 2, label: 'Split in 2' },
    { months: 3, label: 'Split in 3' },
    { months: 4, label: 'Split in 4' },
    { months: 5, label: 'Split in 5' },
    { months: 6, label: 'Split in 6' },
  ];

  const getInstallmentDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < splitMonths; i++) {
      const date = new Date(today);
      date.setMonth(date.getMonth() + i);
      dates.push({
        date: date.toLocaleDateString('en-GB', { 
          day: 'numeric',
          month: 'long'
        }),
        amount: monthlyPayment,
        isFirst: i === 0
      });
    }
    return dates;
  };

  const installmentDates = getInstallmentDates();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">
              {orderData ? 'Complete Order' : 'Complete your order'}
            </h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-600 font-bold"><img src="/Image+Background.png" alt="🪙" width={16} height={16} /></span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Order Information */}
        {orderData && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="bg-white rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono text-sm font-bold text-gray-800">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Partner</span>
                  <span className="font-bold text-gray-800">{orderData.partnerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current level</span>
                  <span className="font-mono text-sm font-bold text-blue-600">{currentUser?.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">QR Code</span>
                  <span className="font-mono text-sm font-bold text-blue-600">{orderData.qrCode}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cart Section */}
        <section>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </h3>
                <p className="text-gray-500 text-sm">Total items in cart</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-800">
                  {totalAmount} TND
                </div>
                <p className="text-gray-500 text-sm">Total amount</p>
              </div>
            </div>
          </div>
        </section>

        {/* TAOO Plan Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Choose TAOO plan</h2>
          
          {/* Split Payment Option */}
          <div className={`bg-white rounded-lg p-4 mb-4 border-2 ${currentUser?.level === 'basic'?'border-gray-200':'border-blue-500'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="split"
                  name="payment-plan"
                  checked={selectedPlan === 'split'}
                  disabled={currentUser?.level === 'basic'}
                  onChange={() => setSelectedPlan('split')}
                  className="w-5 h-5 text-blue-500"
                />
                <label htmlFor="split" className="ml-3 font-semibold text-gray-800">
                  Split your payment
                </label>
              </div>
              <div className="bg-yellow-400 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-gray-800">
                  Earn {pointsForSplit} points
                </span>
              </div>
            </div>
            {currentUser?.level === 'basic' && (<div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-700">
                      This Option is not avalable for Basic level
                    </span>
                  </div>
              </div>)}
            {/* Split Options */}
            {currentUser?.level !== 'basic' && (<div className="flex space-x-2 mb-4">
              {splitOptions.map((option) => (
                <button
                  key={option.months}
                  onClick={() => setSplitMonths(option.months)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    splitMonths === option.months
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>)}

            {/* Installment Schedule */}
           {currentUser?.level !== 'basic' && ( <div className="space-y-2">
              {installmentDates.map((installment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      installment.isFirst ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <span className="text-gray-700">
                      {installment.isFirst ? 'Due today' : installment.date}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {installment.amount.toFixed(2)} TND
                  </span>
                </div>
              ))}
          </div>)}
          </div>

          {/* Pay in Full Option */}
          <div className={`bg-white rounded-lg p-4 border ${currentUser?.level === 'basic'?'border-blue-500':'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="full"
                  name="payment-plan"
                  checked={selectedPlan === 'full'}
                  onChange={() => setSelectedPlan('full')}
                  className="w-5 h-5 text-blue-500"
                />
                <label htmlFor="full" className="ml-3 font-semibold text-gray-800">
                  Pay in Full
                </label>
              </div>
              <div className="bg-yellow-400 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-gray-800">
                  Earn {pointsForFull} points
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pay with</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="h-8">
                  <img src="/flouci_icon.png" alt="Flouci" height={8} className="h-8" />
                </div>
            </div>
          </div>
        </section>

        {/* Pay Button */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors">
          Pay {selectedPlan === 'split' ? monthlyPayment.toFixed(2) : totalAmount.toFixed(2)} TND
        </button>
      </div>
    </div>
  );
}