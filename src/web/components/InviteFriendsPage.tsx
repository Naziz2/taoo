import React, { useState } from 'react';
import { ChevronLeft, Share2, Copy, Users, Gift, Check } from 'lucide-react';

interface InviteFriendsPageProps {
  onBack: () => void;
}

export default function InviteFriendsPage({ onBack }: InviteFriendsPageProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'SLIM2024';
  const referralLink = `https://taoo.app/invite/${referralCode}`;
  
  const stats = {
    totalInvited: 12,
    successfulSignups: 8,
    pointsEarned: 4000,
    pendingRewards: 2000
  };

  const recentInvites = [
    { name: 'Ahmed K.', status: 'completed', points: 50, date: '2024-01-15' },
    { name: 'Fatma M.', status: 'pending', points: 50, date: '2024-01-12' },
    { name: 'Mohamed B.', status: 'completed', points: 50, date: '2024-01-10' },
    { name: 'Leila S.', status: 'completed', points: 50, date: '2024-01-08' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rejoignez TAOO',
        text: 'Découvrez TAOO et gagnez des points sur vos achats !',
        url: referralLink,
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Invitez des amis</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-gray-900">
          <div className="flex items-center mb-4">
            <Gift className="w-8 h-8 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Gagnez 50 points</h2>
              <p className="text-sm opacity-80">Pour chaque ami qui s'inscrit</p>
            </div>
          </div>
          <p className="text-sm opacity-90">
            Partagez TAOO avec vos amis et gagnez des points à chaque inscription réussie !
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">{stats.totalInvited}</div>
            <div className="text-sm text-gray-500">Invitations envoyées</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.successfulSignups}</div>
            <div className="text-sm text-gray-500">Inscriptions réussies</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.pointsEarned}</div>
            <div className="text-sm text-gray-500">Points gagnés</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.pendingRewards}</div>
            <div className="text-sm text-gray-500">Points en attente</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Votre code de parrainage</h3>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">{referralCode}</div>
              <div className="text-sm text-gray-600 break-all">{referralLink}</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            >
              {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? 'Copié !' : 'Copier le lien'}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Partager
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comment ça marche</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Partagez votre lien</h4>
                <p className="text-sm text-gray-600">Envoyez votre lien de parrainage à vos amis</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Ils s'inscrivent</h4>
                <p className="text-sm text-gray-600">Vos amis créent un compte TAOO</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Vous gagnez des points</h4>
                <p className="text-sm text-gray-600">Recevez 50 points pour chaque inscription</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invites */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Invitations récentes</h3>
          
          <div className="space-y-3">
            {recentInvites.map((invite, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{invite.name}</div>
                    <div className="text-sm text-gray-500">{invite.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    invite.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {invite.status === 'completed' ? 'Complété' : 'En attente'}
                  </div>
                  <div className="text-sm text-gray-500">+{invite.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}