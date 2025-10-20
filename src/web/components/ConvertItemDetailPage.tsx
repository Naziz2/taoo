import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Gift, Clock, Users, Check, AlertCircle, Loader, X, Info, Heart, Zap, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ConvertItem } from '../types/entities';

interface ConvertItemDetailPageProps {
  item: ConvertItem;
  onBack: () => void;
  onShowVouchers?: () => void;
  currentUser?: any;
  onConversionSuccess: (item: ConvertItem, pointsSpent: number) => void;
}

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: ConvertItem;
  userPoints: number;
  isProcessing: boolean;
}

function ConversionModal({ isOpen, onClose, onConfirm, item, userPoints, isProcessing }: ConversionModalProps) {
  if (!isOpen) return null;

  const remainingPoints = userPoints - item.pointsCost;
  const canAfford = userPoints >= item.pointsCost;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Confirmer la Conversion</h3>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover mr-3"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.partner}</p>
              </div>
            </div>
          </div>

          {/* Points Calculation */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vos points actuels</span>
              <span className="font-bold text-gray-800">{userPoints.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Coût de conversion</span>
              <span className="font-bold text-red-600">-{item.pointsCost.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Points restants</span>
                <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                  {canAfford ? remainingPoints.toLocaleString() : 'Insuffisant'}
                </span>
              </div>
            </div>
          </div>

          {/* Warning for insufficient points */}
          {!canAfford && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <div>
                  <p className="text-red-800 font-medium">Points insuffisants</p>
                  <p className="text-red-700 text-sm">
                    Il vous manque {(item.pointsCost - userPoints).toLocaleString()} points
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success preview */}
          {canAfford && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="text-green-800 font-medium">Conversion confirmée</p>
                  <p className="text-green-700 text-sm">
                    Vous recevrez votre {item.category === 'gift_card' ? 'carte cadeau' : 'récompense'} par email
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              disabled={!canAfford || isProcessing}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                  Conversion...
                </div>
              ) : (
                'Confirmer la Conversion'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConvertItemDetailPage({ item, onBack,onShowVouchers, currentUser, onConversionSuccess }: ConvertItemDetailPageProps) {
  const { t } = useLanguage();
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const userPoints = currentUser?.points || 0;
  const canAfford = userPoints >= item.pointsCost;
  const isAvailable = item.status === 'available' && (item.remainingQuantity || 0) > 0;
  const stockPercentage = item.quantity && item.quantity > 0 ? (item.remainingQuantity || 0) / item.quantity * 100 : 0;

  // Simulate average rating
useEffect(() => {
  
    setRating(4.2 + Math.random() * 0.6); // Random rating between 4.2-4.8
      /*const fetchData = async () => {
        try {
          const response = await fetch('YOUR_API_ENDPOINT_HERE'); // Replace with your API URL
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();*/
    }, []);
  const getCategoryIcon = () => {
    switch (item.category) {
      case 'gift_card':
        return <Gift className="w-6 h-6 text-yellow-600" />;
      case 'free_product':
        return <Star className="w-6 h-6 text-purple-600" />;
      case 'charity':
        return <Heart className="w-6 h-6 text-red-600" />;
      case 'flouci_transfer':
        return <Zap className="w-6 h-6 text-orange-600" />;
      case 'stay':
        return <Users className="w-6 h-6 text-blue-600" />;
      default:
        return <Gift className="w-6 h-6 text-gray-600" />;
    }
  };

  const getCategoryName = () => {
    switch (item.category) {
      case 'gift_card':
        return 'Carte Cadeau';
      case 'free_product':
        return 'Produit Gratuit';
      case 'charity':
        return 'Don de Charité';
      case 'flouci_transfer':
        return 'Transfert Flouci';
      case 'stay':
        return 'Séjour & Voyage';
      default:
        return 'Récompense';
    }
  };

  const getTermsAndConditions = () => {
    switch (item.category) {
      case 'gift_card':
        return [
          'Carte cadeau valable 12 mois après émission',
          'Utilisable chez tous les partenaires du réseau',
          'Non remboursable et non échangeable',
          'Solde consultable en ligne à tout moment'
        ];
      case 'free_product':
        return [
          'Produit livré sous 7-14 jours ouvrés',
          'Garantie constructeur incluse',
          'Frais de livraison offerts',
          'Échange possible sous 30 jours'
        ];
      case 'charity':
        return [
          'Don directement versé à l\'association',
          'Reçu fiscal envoyé par email',
          'Déductible des impôts selon la législation',
          'Suivi de l\'utilisation des fonds disponible'
        ];
      case 'flouci_transfer':
        return [
          'Transfert instantané vers votre compte Flouci',
          'Aucun frais de transaction',
          'Disponible 24h/24 et 7j/7',
          'Confirmation par SMS'
        ];
      case 'stay':
        return [
          'Réservation sous réserve de disponibilité',
          'Valable 6 mois après émission',
          'Modification possible selon conditions',
          'Annulation selon politique du partenaire'
        ];
      default:
        return ['Conditions générales d\'utilisation applicables'];
    }
  };

  const handleConversion = async () => {
    if (!canAfford || !isAvailable) return;

    setIsProcessing(true);

    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user points and trigger success
      onConversionSuccess(item, item.pointsCost);
      setShowConversionModal(false);
      setShowSuccess(true);
      
      // Auto-close success after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onShowVouchers();
      }, 3000);
      
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRatingSubmit = (newRating: number) => {
    setUserRating(newRating);
    // Here you would submit the rating to your backend
    console.log('Rating submitted:', newRating);
  };

  if (showSuccess) {
    return (
      <div className="bg-gray-50 dark:text-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Conversion Réussie!</h2>
          <p className="text-gray-600 mb-4">
            Votre {getCategoryName().toLowerCase()} sera disponible sous peu
          </p>
          <div className="bg-yellow-100 px-4 py-2 rounded-full inline-block">
            <span className="text-yellow-800 font-semibold">
              -{item.pointsCost.toLocaleString()} points
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={item.thumbnail} 
          alt={item.title}
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

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg flex items-center">
            {getCategoryIcon()}
            <span className="ml-2 font-semibold text-gray-800">{getCategoryName()}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === 'available' ? 'bg-green-500 text-white' :
            item.status === 'upcoming' ? 'bg-yellow-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {item.status === 'available' ? 'Disponible' :
             item.status === 'upcoming' ? 'À venir' : 'Expiré'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Item Info Card */}
        <div className="bg-white  dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800  dark:text-gray-200 mb-2">{item.title}</h1>
            <p className="text-gray-600 mb-3">{item.partner}</p>
            
            {item.value && item.currency && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-lg font-bold inline-block">
                {item.value} {item.currency}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${
                    star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-gray-600  dark:text-gray-400 text-sm">({rating.toFixed(1)}/5)</span>
          </div>
        </div>

        {/* Points Calculation */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800  mb-4 flex items-center">
            <img src="/Image+Background.png" alt="🪙" width={20} height={20} className="mr-2" />
            Calcul des Points
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 ">Points actuels</span>
              <span className="font-bold text-gray-800">{userPoints.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-red-700">Coût de conversion</span>
              <span className="font-bold text-red-700">-{item.pointsCost.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-700">Points restants</span>
              <span className={`font-bold ${canAfford ? 'text-green-700' : 'text-red-700'}`}>
                {canAfford ? (userPoints - item.pointsCost).toLocaleString() : 'Insuffisant'}
              </span>
            </div>
          </div>
        </div>

        {/* Stock Availability */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800  dark:text-gray-200 mb-4 flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            Disponibilité
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">Stock disponible</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {item.remainingQuantity}/{item.quantity}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  stockPercentage > 50 ? 'bg-green-500' :
                  stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <span className={`text-sm font-medium ${
                stockPercentage > 50 ? 'text-green-600' :
                stockPercentage > 20 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {stockPercentage > 50 ? 'Stock disponible' :
                 stockPercentage > 20 ? 'Stock limité' : 'Dernières pièces'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Info className="w-5 h-5 text-purple-600 mr-2" />
            Description
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Conditions d'utilisation
          </h3>
          <div className="space-y-2">
            {getTermsAndConditions().map((term, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-blue-700">{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-600 mr-2" />
            Évaluez cette récompense
          </h3>
          
          <div className="text-center mb-4">
            <div className="flex justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingSubmit(star)}
                  className="transition-colors"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {userRating > 0 ? 'Merci pour votre évaluation!' : 'Cliquez sur les étoiles pour évaluer'}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200  mb-4">Informations supplémentaires</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600 mb-1">Délai de livraison</div>
              <div className="font-bold text-gray-800">
                {item.category === 'flouci_transfer' ? 'Instantané' :
                 item.category === 'gift_card' ? '24h' :
                 item.category === 'charity' ? 'Immédiat' : '7-14 jours'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Gift className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600  mb-1">Type de récompense</div>
              <div className="font-bold text-gray-800">{getCategoryName()}</div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Conversion Button */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <button 
          onClick={() => setShowConversionModal(true)}
          disabled={!canAfford || !isAvailable}
          className={`w-full py-4 px-6 rounded-xl flex items-center justify-between transition-colors shadow-lg ${
            canAfford && isAvailable 
              ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
              canAfford && isAvailable ? 'bg-gray-900' : 'bg-gray-400'
            }`}>
              <span className={`text-xl font-bold ${
                canAfford && isAvailable ? 'text-yellow-400' : 'text-gray-300'
              }`}>→</span>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold">
                {canAfford && isAvailable ? 'Convertir Maintenant' : 
                 !canAfford ? 'Points Insuffisants' : 'Non Disponible'}
              </div>
              <div className="text-sm opacity-80">
                {item.pointsCost.toLocaleString()} points
              </div>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            canAfford && isAvailable ? 'bg-gray-900' : 'bg-gray-400'
          }`}>
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </div>
        </button>
      </div>

      {/* Conversion Modal */}
      <ConversionModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        onConfirm={handleConversion}
        item={item}
        userPoints={userPoints}
        isProcessing={isProcessing}
      />
    </div>
  );
}