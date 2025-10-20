import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShoppingBasket, Clock, HelpCircle, Star, Info, Gift, Calendar, Users, X, Send } from 'lucide-react';

interface DealItemProps {
  id: number;
  store: string;
  storeLogo: string;
  discount: string;
  title: string;
  description: string;
  imgBanner: string;
  quantity: number;
  quantityAvalable: number;
  quantityavalablePerUser: number;
  validaity: string;
  pointsCost: number;
  premium: boolean;
  available: boolean;
  expireAt: string;
  userPoints: number;
  onBack: () => void;
  canBuy: boolean;
  tags?: Array<{ id: number; name: string; icon: string }>;
  sharable: boolean;
  giftable: boolean;
  clientExpirableDaysCount: number;
}

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealTitle: string;
  dealStore: string;
}

function DisputeModal({ isOpen, onClose, dealTitle, dealStore }: DisputeModalProps) {
  const [disputeType, setDisputeType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disputeTypes = [
    { value: 'not_received', label: 'Bon non reçu' },
    { value: 'invalid_code', label: 'Code invalide' },
    { value: 'expired', label: 'Offre expirée' },
    { value: 'merchant_issue', label: 'Problème avec le marchand' },
    { value: 'other', label: 'Autre problème' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would make the actual API call to submit the dispute
    console.log('Dispute submitted:', {
      dealTitle,
      dealStore,
      type: disputeType,
      description: description.trim()
    });
    
    setIsSubmitting(false);
    onClose();
    alert('Votre réclamation a été soumise avec succès. Notre équipe vous contactera sous 24h.');
    
    // Reset form
    setDisputeType('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Signaler un problème</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Deal Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">{dealTitle}</h4>
            <p className="text-sm text-gray-600">{dealStore}</p>
          </div>

          {/* Dispute Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type de problème *
            </label>
            <div className="space-y-2">
              {disputeTypes.map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="disputeType"
                    value={type.value}
                    checked={disputeType === type.value}
                    onChange={(e) => setDisputeType(e.target.value)}
                    className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                  />
                  <span className="ml-3 text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description du problème *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
              placeholder="Décrivez votre problème en détail..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 caractères ({description.length}/10)
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Notre engagement</p>
                <p>Notre équipe support vous contactera sous 24h pour résoudre votre problème.</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!disputeType || description.trim().length < 10 || isSubmitting}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Envoi...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DealItem({ 
  id,
  store, 
  storeLogo, 
  discount, 
  title, 
  description, 
  imgBanner, 
  quantity, 
  quantityAvalable, 
  quantityavalablePerUser, 
  validaity, 
  pointsCost, 
  premium,
  available, 
  expireAt, 
  userPoints,
  onBack,
  canBuy,
  tags = [],
  sharable,
  giftable,
  clientExpirableDaysCount
}: DealItemProps) {
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 57,
    hours: 13,
    minutes: 54,
    seconds: 54
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Image */}
      <div className="relative">
        <img 
          src={imgBanner} 
          alt={title}
          className="w-full h-64 object-cover"
        />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">{userPoints.toLocaleString()}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-yellow-400 px-4 py-2 rounded-lg shadow-lg">
            <span className="text-gray-900 font-bold">{discount}</span>
          </div>
        </div>

        {/* Help Button */}
        <div className="absolute bottom-4 left-4">
          <button 
            onClick={() => setShowDisputeModal(true)}
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <HelpCircle className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Store Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-4 border-yellow-400">
              <span className="text-2xl"><img src="{storeLogo}" alt=""  /></span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
            <p className="text-gray-500 mb-2">{store}</p>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
              Offre Numéro {id}
            </div>
          </div>
        </div>

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              Catégories
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
                  <img src={tag.icon} alt={tag.name} className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{tag.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <ShoppingBasket className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-semibold text-gray-800">Stock</span>
            </div>
            <div className={`text-lg font-bold ${available && canBuy ? 'text-green-600' : 'text-red-600'}`}>
              {available && canBuy ? 'En stock' : 'Épuisé'}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className="font-semibold text-gray-800">Expire</span>
            </div>
            <div className="text-lg font-bold text-orange-600">
              {expireAt}
            </div>
          </div>
        </div>

        {/* Offer Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Gift className="w-5 h-5 text-yellow-600 mr-2" />
            Détails de l'offre
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm mb-1">Vous obtenez</div>
              <div className="text-2xl font-bold text-gray-800">{discount.split(' ')[2] || '15%'}</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-gray-600 text-sm mb-1">Temps restant</div>
              <div className="text-yellow-600 font-bold">
                {timeLeft.days}j {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            Plus d'informations
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Quantité en stock</span>
              <span className="font-bold text-gray-800">{quantity} en stock</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Validité du bon</span>
              <span className="font-bold text-gray-800">{clientExpirableDaysCount} Jours</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Stock disponible</span>
              <span className="font-bold text-gray-800">{quantityAvalable} coupons</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">Disponible pour vous</span>
              <span className="font-bold text-blue-800">{quantityavalablePerUser} coupon(s)</span>
            </div>
            
            {/* Additional Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Partageable</span>
                <span className="font-bold text-green-800">{sharable ? 'Oui' : 'Non'}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700">Cadeau</span>
                <span className="font-bold text-purple-800">{giftable ? 'Oui' : 'Non'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 text-purple-600 mr-2" />
            Description
          </h3>
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Conditions d'utilisation</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
              <span>Offre valable uniquement pour les nouveaux clients</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
              <span>Non cumulable avec d'autres promotions</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
              <span>Valable dans tous les restaurants de la chaîne</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
              <span>Bon valable {clientExpirableDaysCount} jours après achat</span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-600 mr-2" />
            Évaluation
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex space-x-1 mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.8/5</span>
            </div>
            <span className="text-sm text-gray-500">124 avis</span>
          </div>
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Purchase Button */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <button 
          disabled={!canBuy || !available}
          className={`w-full py-4 px-6 rounded-xl flex items-center justify-between transition-colors shadow-lg ${
            canBuy && available 
              ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
              canBuy && available ? 'bg-gray-900' : 'bg-gray-400'
            }`}>
              <span className={`text-xl font-bold ${
                canBuy && available ? 'text-yellow-400' : 'text-gray-300'
              }`}>→</span>
            </div>
            <span className="text-lg font-semibold">
              {canBuy && available ? `Swiper contre ${pointsCost}` : 'Non disponible'}
            </span>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            canBuy && available ? 'bg-gray-900' : 'bg-gray-400'
          }`}>
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </div>
        </button>
      </div>

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        dealTitle={title}
        dealStore={store}
      />
    </div>
  );
}

interface DealDetailPageProps {
  onBack: () => void;
  deal?: any;
}

export default function DealDetailPage({ onBack, deal: propDeal }: DealDetailPageProps) {
  const [userPoints] = useState(13614);
  
  // Use the passed deal or fallback to default
  const deal = propDeal || { 
    id:12,
    store: '✨ Friends Pasta Bar',
    storeLogo:'',
    imgBanner: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount: 'Bon de réduction -15%',
    title: 'Offre de Bienvenue', 
    description: 'Profitez d\'une offre exclusive de 15% de réduction sur votre premier passage chez Friends Pasta bar. Ne manquez pas cette opportunité limitée dans le temps pour économiser sur vos prochains repas! Cette offre est spécialement conçue pour vous faire découvrir notre cuisine authentique et nos spécialités italiennes.',
    quantity: 9,
    quantityAvalable: 9,
    quantityavalablePerUser: 1,
    validaity: '7',
    expireAt: '2025-09-30',
    pointsCost: 275, 
    premium: false,
    available: true
  };
  
  // Map the real deal data to the expected format
  const mappedDeal = propDeal ? {
    id:propDeal.id || 0,
    store: propDeal.companies[0]?.name || 'Partenaire',
    storeLogo: propDeal.companies[0]?.logo || '',
    imgBanner: propDeal.cover || propDeal.thumbnail || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount: propDeal.discountType === 'PERCENT' && propDeal.discountPercentAmount > 0 
      ? `${propDeal.discountPercentAmount}% de réduction`
      : propDeal.discountType === 'MONEY' && propDeal.discountMoneyAmount > 0
      ? `${propDeal.discountMoneyAmount}DT de réduction`
      : 'Offre spéciale',
    title: propDeal.title,
    description: propDeal.description || `Profitez de cette offre exclusive chez ${propDeal.companies[0]?.name}. ${propDeal.title}`,
    quantity: propDeal.count || 0,
    quantityAvalable: propDeal.remainCount || 0,
    quantityavalablePerUser: propDeal.remainEachUserCount || 0,
    validaity: propDeal.clientExpirableDaysCount?.toString() || '30',
    expireAt: propDeal.saleEndAt?.split(' ')[0] || propDeal.publishEndAt?.split(' ')[0] || '2025-09-30',
    pointsCost: propDeal.pointSellPrice,
    premium: propDeal.premium,
    available: propDeal.count > 0 ,
    canBuy: propDeal.canBuy || propDeal.count > 0,
    tags: propDeal.tags || [],
    sharable: propDeal.sharable,
    giftable: propDeal.giftable,
    clientExpirableDaysCount: propDeal.clientExpirableDaysCount || 7
  } : deal;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <DealItem {...mappedDeal} userPoints={userPoints} onBack={onBack} />
    </div>
  );
}