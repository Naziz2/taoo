import React, { useState, useRef } from 'react';
import { ChevronLeft, Camera, Upload, Check, AlertCircle, Loader, Receipt, Gift, Star, Info } from 'lucide-react';

interface ReceiptUploadPageProps {
  onBack: () => void;
  currentUser?: any;
}

interface UploadedReceipt {
  id: string;
  image: string;
  amount: number;
  merchant: string;
  date: string;
  status: 'processing' | 'approved' | 'rejected';
  pointsEarned?: number;
  rejectionReason?: string;
}

export default function ReceiptUploadPage({ onBack, currentUser }: ReceiptUploadPageProps) {
  const [step, setStep] = useState<'upload' | 'processing' | 'success'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [recentReceipts, setRecentReceipts] = useState<UploadedReceipt[]>([
    {
      id: '1',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
      amount: 85.50,
      merchant: 'Carrefour',
      date: '2025-01-15',
      status: 'approved'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
      amount: 45.20,
      merchant: 'Monoprix',
      date: '2025-01-12',
      status: 'processing'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
      amount: 25.00,
      merchant: 'Pharmacie',
      date: '2025-01-10',
      status: 'rejected',
      rejectionReason: 'Receipt not clear enough'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    // For demo purposes, we'll simulate selecting an image
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    setError('');
    setStep('processing');

    try {
      // Simulate upload and processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful processing
      const pointsEarned = Math.floor(Math.random() * 100) + 50; // Random points between 50-150
      
      // Add new receipt to recent receipts
      const newReceipt: UploadedReceipt = {
        id: Date.now().toString(),
        image: selectedImage,
        amount: Math.floor(Math.random() * 200) + 20, // Random amount
        merchant: 'Partner Store',
        date: new Date().toISOString().split('T')[0],
        status: 'approved',
        pointsEarned
      };
      
      setRecentReceipts(prev => [newReceipt, ...prev]);
      setStep('success');
      
      // Update user points (in real app, this would come from backend)
      // currentUser.points += pointsEarned;
      
    } catch (err) {
      setError('Upload failed. Please try again.');
      setStep('upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartOver = () => {
    setStep('upload');
    setSelectedImage(null);
    setError('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Loader className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const calculatePoints = (amount: number) => {
      return Math.floor(amount * 0.003 * 100); // 3% converted to points (assuming 1 TND = 100 points)
    };
  const renderUploadStep = () => (
    <div className="space-y-6">
      {/* How it works */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Gift className="w-6 h-6 text-yellow-600 mr-2" />
          Comment ça marche
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-yellow-600 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Faites vos achats</h4>
              <p className="text-sm text-gray-600">Achetez dans n'importe quel magasin et gardez votre reçu</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-yellow-600 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Prenez une photo</h4>
              <p className="text-sm text-gray-600">Photographiez votre reçu clairement</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
              <span className="text-yellow-600 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Gagnez des points</h4>
              <p className="text-sm text-gray-600">Recevez des points TAOO en récompense</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Télécharger votre reçu</h3>
        
        {selectedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Receipt preview"
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
            
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Soumettre le reçu
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Ajoutez votre reçu</h4>
              <p className="text-gray-600 mb-6">Prenez une photo ou sélectionnez depuis votre galerie</p>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleCameraCapture}
                  className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Appareil photo
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Galerie
                </button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Conseils pour une photo parfaite
        </h3>
        <div className="space-y-1 text-sm text-blue-700">
          <p>• Assurez-vous que le reçu est bien éclairé</p>
          <p>• Toutes les informations doivent être lisibles</p>
          <p>• Incluez la date, le montant et le nom du magasin</p>
          <p>• Évitez les reflets et les ombres</p>
        </div>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Traitement en cours</h2>
        <p className="text-gray-600">
          Nous analysons votre reçu pour calculer vos points de récompense...
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Analyse de l'image</span>
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Extraction des données</span>
            <Loader className="w-5 h-5 text-blue-600 animate-spin" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Calcul des points</span>
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Validation finale</span>
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm text-yellow-700">
          Le traitement prend généralement 30 secondes à 2 minutes selon la qualité de l'image.
        </p>
      </div>
    </div>
  );

  const renderSuccessStep = () => {
    const pointsEarned = 75; // This would come from the processing result
    const amount = 85.50; // This would come from the processing result
    const calculatePoints = (amount: number) => {
      return Math.floor(amount * 0.003 * 100); // 3% converted to points (assuming 1 TND = 100 points)
    };
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Félicitations !</h2>
          <p className="text-gray-600">
            Votre reçu a été validé avec succès
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-gray-900">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">+{calculatePoints(amount)}</div>
            <div className="text-lg font-semibold mb-1">Points gagnés</div>
            <div className="text-sm opacity-80">Pour un achat de {amount} TND</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Détails de la transaction</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant de l'achat</span>
              <span className="font-bold text-gray-800">{amount} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taux de cashback</span>
              <span className="font-bold text-gray-800">
                {currentUser?.level === 'basic' ? '10' : 
                 currentUser?.level === 'silver' ? '12' : '15'} pts/TND
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Points gagnés</span>
              <span className="font-bold text-green-600">+{calculatePoints(amount)} points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nouveau solde</span>
              <span className="font-bold text-gray-800">{(currentUser?.points + calculatePoints(amount)).toLocaleString()} points</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleStartOver}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Télécharger un autre reçu
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Retour au portefeuille
          </button>
        </div>
      </div>
    );
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
            <h1 className="text-xl font-semibold">Télécharger un reçu</h1>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-800">{currentUser?.points.toLocaleString()}</span>
            <span className="ml-1 text-yellow-600">
              <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {step === 'upload' && renderUploadStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'success' && renderSuccessStep()}

        {/* Recent Receipts */}
        {step === 'upload' && recentReceipts.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reçus récents</h3>
            <div className="space-y-3">
              {recentReceipts.slice(0, 3).map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img 
                      src={receipt.image} 
                      alt="Receipt"
                      className="w-12 h-12 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{receipt.merchant}</div>
                      <div className="text-sm text-gray-500">{receipt.amount} TND • {receipt.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                      {getStatusIcon(receipt.status)}
                      <span className="ml-1">
                        {receipt.status === 'approved' ? 'Approuvé' :
                         receipt.status === 'processing' ? 'En cours' : 'Rejeté'}
                      </span>
                    </div>
                    {receipt.status === 'approved' && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        +{calculatePoints(receipt.amount)} pts
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}