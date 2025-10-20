import React, { useState } from 'react';
import { ChevronLeft, QrCode, Clock, CheckCircle, XCircle, Calendar, Gift, User } from 'lucide-react';
import { ConvertItem } from '../types/entities';

interface VouchersPageProps {
  onBack: () => void;
  currentUser?: any;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
  onShowVoucherDetail: (voucher: ConvertItem) => void;
}

export default function VouchersPage({ onBack, vouchers, currentUser,onAccountClick,onShowUpgradeAccount, onShowVoucherDetail }: VouchersPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');

  const getVoucherStatus = (voucher: ConvertItem) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'used':
        return <QrCode className="w-5 h-5 text-blue-500" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'used':
        return 'Utilisé';
      case 'expired':
        return 'Expiré';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'used':
        return 'text-blue-600 bg-blue-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDiscountText = (voucher: ConvertItem) => {
    if (voucher.discountType === 'PERCENT' && voucher.discountPercentAmount > 0) {
      return `${voucher.discountPercentAmount}% de réduction`;
    } else if (voucher.discountType === 'MONEY' && voucher.discountMoneyAmount > 0) {
      return `${voucher.discountMoneyAmount}SAR de réduction`;
    }
    return 'Offre spéciale';
  };

  const filteredVouchers = vouchers.filter(voucher => {
    if (activeFilter === 'all') return true;
    return getVoucherStatus(voucher) === activeFilter;
  });

  const filterCounts = {
    all: vouchers.length,
    active: vouchers.filter(v => getVoucherStatus(v) === 'active').length,
    used: vouchers.filter(v => getVoucherStatus(v) === 'used').length,
    expired: vouchers.filter(v => getVoucherStatus(v) === 'expired').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
        <img src="/taoo_black 1.png" alt="TAOO" width={80} height={30} className="object-contain" />
        <button 
          onClick={onShowUpgradeAccount}
          className="flex items-center bg-yellow-100 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-gray-800">{(currentUser?.points || 0).toLocaleString()}</span>
          <span className="ml-1 text-yellow-600">
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </span>
        </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'Tous', count: filterCounts.all },
              { key: 'active', label: 'Actifs', count: filterCounts.active },
              { key: 'used', label: 'Utilisés', count: filterCounts.used },
              { key: 'expired', label: 'Expirés', count: filterCounts.expired },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Vouchers List */}
        <div className="space-y-4">
          {filteredVouchers.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun bon trouvé</h3>
              <p className="text-gray-500">
                {activeFilter === 'all' 
                  ? 'Vous n\'avez pas encore de bons. Achetez des offres pour commencer!'
                  : `Aucun bon ${getStatusText(activeFilter).toLowerCase()} pour le moment.`
                }
              </p>
            </div>
          ) : (
            filteredVouchers.map((voucher) => {
              const status = getVoucherStatus(voucher);
              const isExpiringSoon = new Date(voucher.expireAt) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              
              return (
                <button
                  key={voucher.id}
                  onClick={() => onShowVoucherDetail(voucher)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    {/* Voucher Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {voucher.cover ? (
                        <img 
                          src={`https://server.taoo.ai/api/uploads/${voucher.cover}`}
                          alt={voucher.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Gift className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Voucher Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm">{voucher.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {getStatusText(status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          {voucher.companies[0]?.name}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-yellow-600 font-medium">
                          {getDiscountText(voucher)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Acheté le {new Date(voucher.createdAt || '').toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {status === 'active' && (
                            <span className={isExpiringSoon ? 'text-orange-600 font-medium' : ''}>
                              Expire le {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}
                            </span>
                          )}
                          {status === 'expired' && (
                            <span className="text-red-600">
                              Expiré le {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}
                            </span>
                          )}
                          {status === 'used' && voucher.code && (
                            <span className="text-blue-600">
                              Code: {voucher.code}
                            </span>
                          )}
                        </div>
                      </div>

                      {isExpiringSoon && status === 'active' && (
                        <div className="mt-2 bg-orange-50 border border-orange-200 rounded-lg p-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-orange-600 mr-2" />
                            <span className="text-xs text-orange-700 font-medium">
                              Expire bientôt ! Utilisez avant le {new Date(voucher.expiresAt || '').toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistiques</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{filterCounts.active}</div>
              <div className="text-xs text-gray-500">Bons actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{filterCounts.used}</div>
              <div className="text-xs text-gray-500">Bons utilisés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{filterCounts.all}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Conseils d'utilisation</h3>
          <div className="space-y-1 text-sm text-blue-700">
            <p>• Présentez le QR code en magasin pour utiliser votre bon</p>
            <p>• Vérifiez les conditions d'utilisation avant de vous rendre</p>
            <p>• Les bons ont une date d'expiration, utilisez-les à temps</p>
          </div>
        </div>
      </div>
    </div>
  );
}