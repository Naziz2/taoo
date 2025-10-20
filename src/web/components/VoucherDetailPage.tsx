import React, { useState } from 'react';
import { ChevronLeft, QrCode, Clock, MapPin, Phone, Globe, Share2, Copy, Check, AlertCircle, Gift, XCircle, CheckCircle } from 'lucide-react';
import { ConvertItem } from '../types/entities';

interface VoucherDetailPageProps {
  voucher: ConvertItem;
  onBack: () => void;
}

export default function VoucherDetailPage({ voucher, onBack }: VoucherDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const getVoucherStatus = () => {
    const now = new Date();
    const expireDate = new Date(voucher.expiresAt || '');
    
    if (voucher.code && voucher.code !== "") {
      return 'used';
    } else if (expireDate < now) {
      return 'expired';
    } else {
      return 'active';
    }
  };

  const getDiscountText = () => {
    if (voucher.discountType === 'PERCENT' && (voucher.discountPercentAmount || 0) > 0) {
      return `${voucher.discountPercentAmount}% de réduction`;
    } else if (voucher.discountType === 'MONEY' && (voucher.discountMoneyAmount || 0) > 0) {
      return `${voucher.discountMoneyAmount}DT de réduction`;
    }
    return 'Offre spéciale';
  };

  const handleCopyCode = () => {
    if (voucher.uuid) {
      navigator.clipboard.writeText(voucher.uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: voucher.title,
        text: `Découvrez cette offre chez ${voucher.companies[0]?.name}`,
        url: window.location.href,
      });
    }
  };

  const status = getVoucherStatus();
  const isExpired = status === 'expired';
  const isUsed = status === 'used';
  const isActive = status === 'active';
  const isExpiringSoon = new Date(voucher.expiresAt || '') <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Détails du Bon</h1>
          </div>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Share2 className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Voucher Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-4 border-yellow-400">
              {voucher.companies[0]?.logo ? (
                <img 
                  src={`https://server.taoo.ai/api/uploads/${voucher.companies[0].logo}`}
                  alt={voucher.companies[0].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <Gift className="w-10 h-10 text-gray-600" />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{voucher.title}</h1>
            <p className="text-gray-600 mb-3">{voucher.companies[0]?.name}</p>
            
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-lg font-bold inline-block mb-4">
              {getDiscountText()}
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isActive ? 'bg-green-100 text-green-800' :
              isUsed ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {isActive && <CheckCircle className="w-4 h-4 mr-2" />}
              {isUsed && <QrCode className="w-4 h-4 mr-2" />}
              {isExpired && <XCircle className="w-4 h-4 mr-2" />}
              {isActive ? 'Bon Actif' : isUsed ? 'Bon Utilisé' : 'Bon Expiré'}
            </div>
          </div>
        </div>

        {/* Expiration Warning */}
        {isExpiringSoon && isActive && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
              <div>
                <h3 className="font-semibold text-orange-800">Attention - Expire bientôt!</h3>
                <p className="text-sm text-orange-700">
                  Ce bon expire le {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}. 
                  Utilisez-le rapidement pour ne pas perdre votre réduction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Section */}
        {isActive && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Code QR pour utilisation
            </h3>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                {showQRCode ? (
                  <div className="text-center">
                    <div className="w-40 h-40 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center mb-2">
                      <div className="text-xs font-mono break-all p-2 text-center">
                        {voucher.uuid}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">QR Code</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowQRCode(true)}
                    className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <QrCode className="w-12 h-12 mb-2" />
                    <span className="text-sm font-medium">Afficher le QR Code</span>
                  </button>
                )}
              </div>

              {/* Voucher Code */}
              <div className="bg-gray-50 rounded-lg p-4 w-full">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Code du bon:</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-mono text-lg font-bold text-gray-800 bg-white px-4 py-2 rounded border">
                      {voucher.uuid}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-gray-900" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-900" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 mt-1">Code copié!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Used Voucher Info */}
        {isUsed && voucher.code && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-center">
              <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">Bon utilisé avec succès!</h3>
              <p className="text-sm text-blue-700 mb-3">
                Ce bon a été utilisé avec le code: <span className="font-mono font-bold">{voucher.code}</span>
              </p>
            </div>
          </div>
        )}

        {/* Voucher Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Détails de l'offre</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Type d'offre</span>
              <span className="font-bold text-gray-800">{voucher.type}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Réduction</span>
              <span className="font-bold text-gray-800">{getDiscountText()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Date d'achat</span>
              <span className="font-bold text-gray-800">
                {new Date(voucher.createdAt || '').toLocaleDateString('fr-FR')}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Date d'expiration</span>
              <span className={`font-bold ${isExpired ? 'text-red-600' : 'text-gray-800'}`}>
                {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Utilisation</span>
              <div className="flex items-center space-x-2">
                {voucher.canUseOnline && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">En ligne</span>
                )}
                {voucher.canUseOffline && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">En magasin</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: (voucher.description || '').replace(/\<\/br\>/g, '<br/>').replace(/\r\n/g, '<br/>') 
            }}
          />
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations du magasin</h3>
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              {voucher.companies?.[0]?.logo ? (
                <img 
                  src={`https://server.taoo.ai/api/uploads/${voucher.companies[0].logo}`}
                  alt={voucher.companies[0].name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <Gift className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{voucher.companies?.[0]?.name}</h4>
              <p className="text-sm text-gray-600">Partenaire TAOO</p>
            </div>
          </div>

          {voucher.website && (
            <button
              onClick={() => window.open(voucher.website, '_blank')}
              className="w-full flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Globe className="w-5 h-5 text-blue-600 mr-3" />
              <span>{voucher.discountCondition || ''}</span>
            </button>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Comment utiliser ce bon</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Rendez-vous en magasin</h4>
                <p className="text-sm text-blue-700">
                  Présentez-vous chez {voucher.companies?.[0]?.name} avec votre bon
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Présentez le QR code</h4>
                <p className="text-sm text-blue-700">
                  Montrez le QR code ou donnez le code {voucher.uuid} au vendeur
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Profitez de votre réduction</h4>
                <p className="text-sm text-blue-700">
                  Bénéficiez de {getDiscountText()} sur votre achat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conditions d'utilisation</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>Bon valable uniquement chez {voucher.companies?.[0]?.name}</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>Non cumulable avec d'autres promotions</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>Valable jusqu'au {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>Utilisation unique par bon</span>
            </div>
            {voucher.discountCondition && (
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>{voucher.discountCondition}</span>
              </div>
            )}
          </div>
        </div>

        {/* Voucher Info */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-gray-800">ID: {voucher.id}</div>
              <div className="text-gray-600">Numéro de bon</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">#{voucher.offerId || 'N/A'}</div>
              <div className="text-gray-600">Offre originale</div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}