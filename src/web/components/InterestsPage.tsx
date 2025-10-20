import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';

interface InterestsPageProps {
  onBack: () => void;
}

interface Interest {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export default function InterestsPage({ onBack }: InterestsPageProps) {
  const [interests, setInterests] = useState<Interest[]>([
    { id: '1', name: 'Mode & Accessoires', icon: '👗', selected: true },
    { id: '2', name: 'Technologie', icon: '📱', selected: true },
    { id: '3', name: 'Voyage & Transport', icon: '✈️', selected: false },
    { id: '4', name: 'Sport & Fitness', icon: '⚽', selected: true },
    { id: '5', name: 'Maison & Déco', icon: '🏠', selected: false },
    { id: '6', name: 'Beauté & Cosmétiques', icon: '💄', selected: true },
    { id: '7', name: 'Alimentation', icon: '🍕', selected: false },
    { id: '8', name: 'Livres & Culture', icon: '📚', selected: false },
    { id: '9', name: 'Gaming', icon: '🎮', selected: true },
    { id: '10', name: 'Santé & Bien-être', icon: '💊', selected: false },
    { id: '11', name: 'Automobile', icon: '🚗', selected: false },
    { id: '12', name: 'Électroménager', icon: '🔌', selected: false },
  ]);

  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.map(interest => 
        interest.id === id 
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    );
  };

  const selectedCount = interests.filter(interest => interest.selected).length;

  const handleSave = () => {
    // Save interests logic here
    console.log('Saving interests:', interests.filter(i => i.selected));
    onBack();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Centres d'intérêt</h1>
          </div>
          <button
            onClick={handleSave}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Personnalisez votre expérience</h3>
          <p className="text-sm text-blue-700">
            Sélectionnez vos centres d'intérêt pour recevoir des offres personnalisées et des recommandations adaptées à vos goûts.
          </p>
          <div className="mt-2 text-sm font-medium text-blue-800">
            {selectedCount} catégorie{selectedCount !== 1 ? 's' : ''} sélectionnée{selectedCount !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Interests Grid */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choisissez vos catégories préférées</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  interest.selected
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    {interest.name}
                  </div>
                  {interest.selected && (
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-gray-900" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Avantages de la personnalisation</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-700">Offres personnalisées selon vos goûts</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-700">Notifications ciblées sur vos marques préférées</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-700">Recommandations de produits adaptées</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-700">Accès prioritaire aux ventes dans vos catégories</span>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Catégories populaires</h3>
          <p className="text-sm text-gray-800 opacity-90">
            Mode, Technologie et Gaming sont les catégories les plus populaires parmi nos utilisateurs.
          </p>
        </div>
      </div>
    </div>
  );
}