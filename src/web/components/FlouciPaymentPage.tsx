import React, { useState } from 'react';
import { ChevronLeft, Smartphone, Send, CreditCard, Banknote, Users, Zap, Shield, Check, AlertCircle, Loader } from 'lucide-react';

interface FlouciPaymentPageProps {
  currentUser?: any;
  onBack: () => void;
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
  action: () => void;
}

export default function FlouciPaymentPage({ currentUser, onBack }: FlouciPaymentPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const userBalance = currentUser.balance || 0; // TND
  const userPoints = currentUser.points;

  const paymentOptions: PaymentOption[] = [
    {
      id: 'transfer',
      title: 'Transfert P2P',
      description: 'Envoyez de l\'argent à vos proches',
      icon: Users,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      action: () => setSelectedService('transfer')
    },
    {
      id: 'bills',
      title: 'Paiement de Factures',
      description: 'Payez vos factures facilement',
      icon: CreditCard,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      action: () => setSelectedService('bills')
    },
    {
      id: 'atm',
      title: 'Retrait sans Carte',
      description: 'Retirez de l\'argent sans carte bancaire',
      icon: Banknote,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      action: () => setSelectedService('atm')
    },
    {
      id: 'topup',
      title: 'Recharge Mobile',
      description: 'Rechargez votre crédit mobile',
      icon: Smartphone,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      action: () => setSelectedService('topup')
    }
  ];

  const billProviders = [
    { id: 'steg', name: 'STEG', logo: '⚡', category: 'Électricité' },
    { id: 'sonede', name: 'SONEDE', logo: '💧', category: 'Eau' },
    { id: 'tunisie_telecom', name: 'Tunisie Télécom', logo: '📞', category: 'Télécom' },
    { id: 'ooredoo', name: 'Ooredoo', logo: '📱', category: 'Mobile' },
    { id: 'orange', name: 'Orange', logo: '🍊', category: 'Mobile' },
  ];

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setShowConfirmation(true);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderServiceForm = () => {
    switch (selectedService) {
      case 'transfer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone du destinataire
              </label>
              <input
                type="tel"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+216 XX XXX XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant (TND)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                max="1000"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        );

      case 'bills':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fournisseur de service
              </label>
              <div className="grid grid-cols-1 gap-2">
                {billProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setRecipient(provider.id)}
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      recipient === provider.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl mr-3">{provider.logo}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{provider.name}</div>
                      <div className="text-sm text-gray-600">{provider.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de contrat / Référence
              </label>
              <input
                type="text"
                placeholder="Entrez votre numéro de contrat"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        );

      case 'atm':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant à retirer (TND)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[20, 50, 100, 200, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 px-3 border rounded-lg font-medium transition-colors ${
                      amount === preset.toString()
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {preset} TND
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Montant personnalisé"
                min="10"
                max="1000"
                step="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Code de retrait</h4>
              <p className="text-sm text-purple-700">
                Un code de retrait à 6 chiffres sera généré après confirmation. 
                Utilisez ce code au distributeur automatique pour retirer votre argent.
              </p>
            </div>
          </div>
        );

      case 'topup':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+216 XX XXX XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant de recharge (TND)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[5, 10, 20, 30, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 px-3 border rounded-lg font-medium transition-colors ${
                      amount === preset.toString()
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {preset} TND
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showConfirmation) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Paiement Confirmé</h1>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Paiement Réussi!</h2>
          <p className="text-gray-600 text-center mb-6">
            Votre transaction a été traitée avec succès.
          </p>

          <div className="bg-white rounded-xl p-6 w-full shadow-sm mb-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Montant</span>
                <span className="font-bold text-gray-800">{amount} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-bold text-gray-800">
                  {paymentOptions.find(opt => opt.id === selectedService)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-bold text-gray-800">
                  {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Retour au Portefeuille
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Flouci Pay</h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">{userPoints.toLocaleString()}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Flouci Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4">
            
            <div>
                <img src="/flouci_icon.png" alt="Flouci" height={8} width="auto" className="h-12" />
              <p className="text-sm opacity-90">Votre portefeuille mobile</p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">Solde disponible</span>
              <span className="text-2xl font-bold">{userBalance.toFixed(3)} TND</span>
            </div>
          </div>
        </div>

        {!selectedService ? (
          <>
            {/* Payment Services */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Services de Paiement</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={option.action}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                    >
                      <div className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 ${option.textColor}`} />
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm text-center">{option.title}</h4>
                      <p className="text-xs text-gray-600 text-center mt-1">{option.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pourquoi Flouci ?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sécurisé</h4>
                    <p className="text-sm text-gray-600">Transactions protégées et cryptées</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Instantané</h4>
                    <p className="text-sm text-gray-600">Transferts et paiements en temps réel</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sans Carte</h4>
                    <p className="text-sm text-gray-600">Retraits ATM sans carte bancaire</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transactions Récentes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Transfert à Ahmed</div>
                      <div className="text-sm text-gray-500">Aujourd'hui, 14:30</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold">-25.00 TND</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Facture STEG</div>
                      <div className="text-sm text-gray-500">Hier, 16:45</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold">-85.50 TND</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Service Form */
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setSelectedService(null)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-800">
                {paymentOptions.find(opt => opt.id === selectedService)?.title}
              </h3>
            </div>

            {renderServiceForm()}

            {/* Balance Check */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Solde disponible</span>
                <span className="font-bold text-gray-800">{userBalance.toFixed(3)} TND</span>
              </div>
              {amount && parseFloat(amount) > userBalance && (
                <div className="mt-2 flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Solde insuffisant</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handlePayment}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > userBalance || isProcessing}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {selectedService === 'transfer' && 'Envoyer'}
                  {selectedService === 'bills' && 'Payer la Facture'}
                  {selectedService === 'atm' && 'Générer Code de Retrait'}
                  {selectedService === 'topup' && 'Recharger'}
                </>
              )}
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Sécurité Flouci</p>
              <p>Toutes les transactions sont sécurisées et protégées par un cryptage de niveau bancaire.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}