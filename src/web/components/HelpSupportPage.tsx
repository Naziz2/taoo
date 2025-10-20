import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Phone, Mail, HelpCircle, Search } from 'lucide-react';

interface HelpSupportPageProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpSupportPage({ onBack }: HelpSupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Comment gagner des points TAOO ?',
      answer: 'Vous pouvez gagner des points en effectuant des achats chez nos partenaires (1 TND = 1 point), en parrainant des amis (500 points), en vous connectant quotidiennement (10 points), et en écrivant des avis (25 points).',
      category: 'Points'
    },
    {
      id: '2',
      question: 'Comment fonctionne le paiement fractionné ?',
      answer: 'Vous pouvez diviser vos achats en 2 à 6 mensualités. Le premier paiement est dû immédiatement, puis les paiements suivants sont prélevés automatiquement chaque mois.',
      category: 'Paiement'
    },
    {
      id: '3',
      question: 'Quelle est ma limite mensuelle ?',
      answer: 'Votre limite mensuelle dépend de votre profil et historique. Elle est actuellement de 2000 TND par mois. Vous pouvez la consulter dans votre portefeuille.',
      category: 'Limite'
    },
    {
      id: '4',
      question: 'Comment utiliser mes points ?',
      answer: 'Vos points peuvent être utilisés pour acheter des produits, des cartes cadeaux, ou des offres spéciales. 1 point = 1 TND de valeur d\'achat.',
      category: 'Points'
    },
    {
      id: '5',
      question: 'Que faire si mon paiement échoue ?',
      answer: 'Si votre paiement échoue, vérifiez vos informations bancaires et votre solde. Vous pouvez réessayer le paiement depuis votre historique de transactions.',
      category: 'Paiement'
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Aide et contact</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nous contacter</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">Chat en direct</h4>
                <p className="text-sm text-gray-600">Disponible 24h/24, 7j/7</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">Téléphone</h4>
                <p className="text-sm text-gray-600">+216 70 123 456</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-sm text-gray-600">support@taoo.tn</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions fréquentes</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-800">{faq.question}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4">
                    <div className="pl-8 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune question trouvée pour "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Liens utiles</h3>
          
          <div className="space-y-2">
            <button className="w-full text-left py-3 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-between">
              <span>Guide d'utilisation</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="border-t border-gray-100 pt-2">
              <button className="w-full text-left py-3 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-between">
                <span>Politique de confidentialité</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="border-t border-gray-100 pt-2">
              <button className="w-full text-left py-3 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-between">
                <span>Conditions d'utilisation</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">TAOO App v2.1.0</p>
          <p className="text-xs text-gray-500 mt-1">© 2024 TAOO. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}