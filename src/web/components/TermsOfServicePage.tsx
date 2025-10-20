import React from 'react';
import { ChevronLeft, Shield, FileText, Scale, Phone, Mail, Globe } from 'lucide-react';

interface TermsOfServicePageProps {
  onBack: () => void;
}

export default function TermsOfServicePage({ onBack }: TermsOfServicePageProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Terms of Service</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Terms of Service</h2>
            <p className="text-gray-600">TAOO Shopping App</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Effective Date: January 15, 2025</p>
              <p>Last Updated: January 15, 2025</p>
              <p>Version: 2.1.0</p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-800">Mobile Authentication</div>
              <div className="text-sm text-gray-600">4-digit OTP system</div>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-800">QR Code System</div>
              <div className="text-sm text-gray-600">Scan & order process</div>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-800">Account Levels</div>
              <div className="text-sm text-gray-600">Basic, Silver, Gold</div>
            </button>
            <button className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-800">Points System</div>
              <div className="text-sm text-gray-600">Earning & redemption</div>
            </button>
          </div>
        </div>

        {/* Key Sections */}
        <div className="space-y-4">
          {/* Mobile Authentication */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Mobile Authentication</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Phone number authentication with Tunisian format (+216 XX XXX XXX)</p>
              <p>• 4-digit OTP verification sent via SMS for security</p>
              <p>• OTP expires after 5 minutes with maximum 3 attempts</p>
              <p>• Test code "1234" available for development purposes</p>
              <p>• Account upgrades require additional OTP verification</p>
            </div>
          </div>

          {/* QR Code System */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">QR Code Checkout</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Scan partner QR codes at store locations</p>
              <p>• Generate unique order QR codes with 10-minute expiration</p>
              <p>• Partners scan your QR to create orders</p>
              <p>• Automatic points earning on QR purchases</p>
              <p>• Real-time order tracking and payment processing</p>
            </div>
          </div>

          {/* Account Levels */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Account Levels & Subscriptions</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-lg">
                <div className="font-medium text-amber-800">Basic (Free)</div>
                <div className="text-sm text-amber-700">10 points/TND • Basic features</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-800">Silver (10.50 TND/month)</div>
                <div className="text-sm text-gray-700">15 points/TND • Installments • Premium deals</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="font-medium text-yellow-800">Gold (19.50 TND/month)</div>
                <div className="text-sm text-yellow-700">20 points/TND • VIP access • Enhanced features</div>
              </div>
            </div>
          </div>

          {/* Points System */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 mr-3">
                <img src="/Image+Background.png" alt="🪙" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Points & Rewards</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Earn points on every purchase at 60+ partner stores</p>
              <p>• Daily check-in bonuses: 10-20 points based on level</p>
              <p>• Referral rewards: 50-100 points per successful invite</p>
              <p>• Redeem points for deals, vouchers, and gift cards</p>
              <p>• Premium deals exclusive to Silver/Gold members</p>
            </div>
          </div>

          {/* Partner Network */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-indigo-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Partner Network</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• 60+ verified Tunisian businesses across multiple categories</p>
              <p>• Fashion: H&M, Kiabi, Shwoppy, La Reine</p>
              <p>• Food: KFC, Ben Yaghlane, Friends Pasta Bar, Mikui</p>
              <p>• Tech: SkyMil Informatique, Iberis, WeFix</p>
              <p>• Sports: California Gym, Arena Gym, Slim Fit</p>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Industry-standard encryption for all data transmission</p>
              <p>• Secure JWT-based authentication for session management</p>
              <p>• GDPR-compliant data handling and user consent</p>
              <p>• Phone number verification for enhanced security</p>
              <p>• Regular security audits and vulnerability assessments</p>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Responsibilities</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Provide accurate phone number and personal information</p>
              <p>• Maintain security of your account and OTP codes</p>
              <p>• Use QR codes responsibly and within expiration times</p>
              <p>• Follow partner store policies and terms</p>
              <p>• Report suspicious activity or technical issues promptly</p>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Prohibited Activities</h3>
            <div className="space-y-2 text-sm text-red-700">
              <p>• Creating multiple accounts to circumvent limits</p>
              <p>• Sharing or selling account credentials, points, or vouchers</p>
              <p>• Manipulating the QR code system or generating fake codes</p>
              <p>• Abusing the referral system with fake accounts</p>
              <p>• Using automated systems or bots to interact with the Service</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Email Support</div>
                  <div className="text-sm text-gray-600">support@taoo.tn</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Phone Support</div>
                  <div className="text-sm text-gray-600">+216 70 123 456</div>
                </div>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Website</div>
                  <div className="text-sm text-gray-600">https://taoo.tn</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Agreement Acknowledgment</h3>
              <p className="text-sm text-yellow-700 mb-4">
                By using TAOO, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <div className="text-xs text-yellow-600">
                <p>Document Version: 2.1.0</p>
                <p>Built with ❤️ in Tunisia 🇹🇳</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}