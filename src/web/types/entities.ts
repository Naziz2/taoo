// TAOO Shopping App - Database Entities
// TypeScript interfaces representing the database schema

export interface Customer {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  level: 'basic' | 'silver' | 'gold';
  points: number;
  monthly_limit: number;
  used_this_month: number;
  account_age_days: number;
  profile_completion: number;
  language: 'en' | 'fr' | 'ar';
  referral_code: string;
  referred_by?: string;
  phone_verified: boolean;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerOtp {
  id: string;
  phone: string;
  otp_code: string; // 4-digit OTP code
  expires_at: Date;
  verified: boolean;
  attempts: number;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerSubscription {
  id: string;
  customer_id: string;
  level: 'silver' | 'gold';
  billing_cycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  price: number;
  currency: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  started_at: Date;
  expires_at: Date;
  auto_renew: boolean;
  payment_method: string;
  otp_verified: boolean; // 4-digit OTP verification for upgrades
  created_at: Date;
  updated_at: Date;
}

export interface Merchant {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  cover_url?: string;
  website_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  cashback_rate: number;
  max_cashback?: number;
  is_active: boolean;
  can_use_online: boolean;
  can_use_offline: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MerchantStore {
  id: string;
  merchant_id: string;
  name: string;
  address: string;
  phone?: string;
  city: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  icon_url?: string;
  position: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MerchantCategory {
  id: string;
  merchant_id: string;
  category_id: string;
  created_at: Date;
}

export interface Deal {
  id: string;
  merchant_id: string;
  title: string;
  description: string;
  discount_type: 'PERCENT' | 'MONEY';
  discount_percent_amount?: number;
  discount_money_amount?: number;
  point_sell_price: number;
  money_sell_price?: number;
  purchase_type: 'POINTS_ONLY' | 'MONEY_ONLY' | 'BOTH';
  total_quantity: number;
  remaining_quantity: number;
  max_per_user: number;
  premium: boolean;
  background_color?: string;
  text_color?: string;
  title_color?: string;
  thumbnail_url?: string;
  card_size: 'SMALL' | 'MEDIUM' | 'LARGE';
  client_expirable_days: number;
  is_sharable: boolean;
  is_giftable: boolean;
  sale_start_at: Date;
  sale_end_at: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: string;
  customer_id: string;
  merchant_id?: string;
  deal_id?: string;
  type: 'purchase' | 'deal_purchase' | 'referral' | 'daily_checkin' | 'subscription';
  amount: number;
  currency: string;
  points_earned: number;
  points_spent: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method?: string;
  payment_provider?: string;
  external_transaction_id?: string;
  description?: string;
  metadata?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface InstallmentPlan {
  id: string;
  transaction_id: string;
  customer_id: string;
  total_amount: number;
  total_installments: number;
  monthly_amount: number;
  currency: string;
  status: 'active' | 'completed' | 'cancelled' | 'defaulted';
  created_at: Date;
  updated_at: Date;
}

export interface Installment {
  id: string;
  installment_plan_id: string;
  installment_number: number;
  amount: number;
  currency: string;
  due_date: Date;
  paid_date?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  external_payment_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  customer_id: string;
  merchant_id: string;
  order_qr_code: string; // User's order QR code (10-minute expiration)
  merchant_qr_code: string;
  status: 'pending' | 'confirmed' | 'expired' | 'cancelled';
  total_amount?: number;
  currency: string;
  expires_at: Date;
  confirmed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
}

export interface CustomerDeal {
  id: string;
  customer_id: string;
  deal_id: string;
  voucher_code: string; // Digital voucher with QR code
  purchase_price_points: number;
  purchase_price_money?: number;
  currency?: string;
  status: 'active' | 'used' | 'expired' | 'cancelled';
  purchased_at: Date;
  expires_at: Date;
  used_at?: Date;
  qr_code?: string; // QR code for voucher redemption
  created_at: Date;
  updated_at: Date;
}

export interface CustomerInterest {
  id: string;
  customer_id: string;
  category_id: string;
  created_at: Date;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: 'pending' | 'completed' | 'cancelled';
  points_awarded: number;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: string;
  customer_id: string;
  type: 'points_earned' | 'deal_purchased' | 'referral_completed' | 'subscription_reminder' | 'general';
  title: string;
  message: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerSession {
  id: string;
  customer_id: string;
  token: string; // JWT token for mobile authentication
  device_info?: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface OtpSession {
  id: string;
  phone: string;
  session_token: string; // Temporary session for OTP verification
  expires_at: Date;
  created_at: Date;
}

export interface AuditLog {
  id: string;
  customer_id?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface AppSettings {
  id: string;
  key: string;
  value: string;
  description?: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

// Utility types for API responses
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Enums for better type safety
export enum CustomerLevel {
  BASIC = 'basic',
  SILVER = 'silver',
  GOLD = 'gold'
}

export enum TransactionType {
  PURCHASE = 'purchase',
  DEAL_PURCHASE = 'deal_purchase',
  REFERRAL = 'referral',
  DAILY_CHECKIN = 'daily_checkin',
  SUBSCRIPTION = 'subscription',
  QR_ORDER = 'qr_order',
  UPGRADE_FEE = 'upgrade_fee'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Additional interfaces for mobile authentication flow
export interface AuthResponse {
  customer: Customer;
  token: string;
  isNewUser: boolean;
}

export interface OtpVerificationRequest {
  phone: string;
  otp: string; // 4-digit code
}

export interface ProfileCompletionRequest {
  phone: string;
  firstName: string;
  lastName: string;
  referralCode?: string;
}

export interface UpgradeAccountRequest {
  level: 'silver' | 'gold';
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  otp: string; // 4-digit verification
}

export interface QrScanRequest {
  merchantQrCode: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface OrderRequest {
  customerQrCode: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}
export enum DealDiscountType {
  PERCENT = 'PERCENT',
  MONEY = 'MONEY'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PENDING = 'pending'
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

// Unified ConvertItem/Voucher interface
export interface ConvertItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'gift_card' | 'free_product' | 'charity' | 'flouci_transfer' | 'stay';
  status: 'available' | 'upcoming' | 'expired' | 'active' | 'used';
  thumbnail: string;
  value?: number;
  currency?: string;
  expiresAt?: string;
  availableUntil?: string;
  quantity?: number;
  remainingQuantity?: number;
  partner?: string;
  location?: string;
  bgColor?: string;
  textColor?: string;
  titleColor?: string;
  // Voucher-specific fields
  cover?: string;
  type?: string;
  createdAt?: string;
  uuid?: string;
  website?: string;
  companies?: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
  error?: boolean;
  offerId?: number;
  discountType?: string;
  moneyAmount?: number;
  discountPercentAmount?: number;
  discountMoneyAmount?: number;
  minDiscountCalculatedAmount?: number;
  maxDiscountCalculatedAmount?: number;
  discountCondition?: string;
  canUseOnline?: boolean;
  canUseOffline?: boolean;
  code?: string;
  orderId?: string | null;
}