// Customer Repository - Database operations for customers
import { db, QueryBuilder, handleDatabaseError } from '../lib/database';
import { Customer, CustomerSubscription, CustomerOtp, PaginatedResponse } from '../types/entities';

export class CustomerRepository {
  // Create a new customer with phone number
  async create(userData: {
    phone: string;
    firstName: string;
    lastName: string;
    referralCode: string;
    referredBy?: string;
  }): Promise<Customer> {
    try {
      const { query, params } = QueryBuilder.buildInsertQuery('customers', {
        phone: userData.phone,
        first_name: userData.firstName,
        last_name: userData.lastName,
        referral_code: userData.referralCode,
        referred_by: userData.referredBy,
        phone_verified: true, // Verified through 4-digit OTP
        points: 100, // Welcome bonus for new customers
      }, ['*']);

      const customers = await db.query<Customer>(query, params);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Find customer by phone
  async findByPhone(phone: string): Promise<Customer | null> {
    try {
      const { query, params } = QueryBuilder.buildSelectQuery('customers', ['*'], { phone });
      return await db.queryOne<Customer>(query, params);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Find customer by ID
  async findById(id: string): Promise<Customer | null> {
    try {
      const { query, params } = QueryBuilder.buildSelectQuery('customers', ['*'], { id });
      return await db.queryOne<Customer>(query, params);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Find customer by referral code
  async findByReferralCode(referralCode: string): Promise<Customer | null> {
    try {
      const { query, params } = QueryBuilder.buildSelectQuery('customers', ['*'], { referral_code: referralCode });
      return await db.queryOne<Customer>(query, params);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Update customer points
  async updatePoints(id: string, pointsChange: number): Promise<Customer> {
    try {
      const query = `
        UPDATE customers 
        SET points = points + $1, updated_at = NOW()
        WHERE id = $2 
        RETURNING *
      `;
      const customers = await db.query<Customer>(query, [pointsChange, id]);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Update monthly spending
  async updateMonthlySpending(id: string, amount: number): Promise<Customer> {
    try {
      const query = `
        UPDATE customers 
        SET used_this_month = used_this_month + $1, updated_at = NOW()
        WHERE id = $2 
        RETURNING *
      `;
      const customers = await db.query<Customer>(query, [amount, id]);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Reset monthly spending (called monthly)
  async resetMonthlySpending(): Promise<number> {
    try {
      const query = `
        UPDATE customers 
        SET used_this_month = 0, updated_at = NOW()
        WHERE used_this_month > 0
      `;
      const result = await db.query(query);
      return result.length;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Update customer level
  async updateLevel(id: string, level: 'basic' | 'silver' | 'gold'): Promise<Customer> {
    try {
      const { query, params } = QueryBuilder.buildUpdateQuery('customers', { level }, { id }, ['*']);
      const customers = await db.query<Customer>(query, params);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Get customer statistics
  async getCustomerStats(id: string): Promise<{
    totalTransactions: number;
    totalPointsEarned: number;
    totalPointsSpent: number;
    totalReferrals: number;
    activeDeals: number;
  }> {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM transactions WHERE customer_id = $1 AND status = 'completed') as total_transactions,
          (SELECT COALESCE(SUM(points_earned), 0) FROM transactions WHERE customer_id = $1 AND status = 'completed') as total_points_earned,
          (SELECT COALESCE(SUM(points_spent), 0) FROM transactions WHERE customer_id = $1 AND status = 'completed') as total_points_spent,
          (SELECT COUNT(*) FROM referrals WHERE referrer_id = $1 AND status = 'completed') as total_referrals,
          (SELECT COUNT(*) FROM customer_deals WHERE customer_id = $1 AND status = 'active') as active_deals
      `;
      
      const result = await db.queryOne(query, [id]);
      return {
        totalTransactions: parseInt(result?.total_transactions || '0'),
        totalPointsEarned: parseInt(result?.total_points_earned || '0'),
        totalPointsSpent: parseInt(result?.total_points_spent || '0'),
        totalReferrals: parseInt(result?.total_referrals || '0'),
        activeDeals: parseInt(result?.active_deals || '0'),
      };
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // OTP Management
  async createOtp(phone: string, otpCode: string): Promise<CustomerOtp> { // 4-digit OTP
    try {
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      
      // First, invalidate any existing OTPs for this phone
      await db.query('UPDATE customer_otps SET verified = true WHERE phone = $1 AND verified = false', [phone]);
      
      const { query, params } = QueryBuilder.buildInsertQuery('customer_otps', {
        phone,
        otp_code: otpCode,
        expires_at: expiresAt,
        verified: false,
        attempts: 0,
      }, ['*']);

      const otps = await db.query<CustomerOtp>(query, params);
      return otps[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async verifyOtp(phone: string, otpCode: string): Promise<CustomerOtp | null> { // 4-digit verification
    try {
      // Increment attempts first
      await db.query(`
        UPDATE customer_otps 
        SET attempts = attempts + 1, updated_at = NOW()
        WHERE phone = $1 AND otp_code = $2 AND expires_at > NOW() AND verified = false
      `, [phone, otpCode]);
      
      const query = `
        SELECT * FROM customer_otps 
        WHERE phone = $1 AND otp_code = $2 AND expires_at > NOW() AND verified = false AND attempts <= 3
        ORDER BY created_at DESC 
        LIMIT 1
      `;
      
      const otp = await db.queryOne<CustomerOtp>(query, [phone, otpCode]);
      
      if (otp) {
        // Mark as verified
        const updateQuery = `
          UPDATE customer_otps 
          SET verified = true, updated_at = NOW()
          WHERE id = $1
          RETURNING *
        `;
        const updatedOtps = await db.query<CustomerOtp>(updateQuery, [otp.id]);
        return updatedOtps[0];
      }
      
      return null;
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Check if OTP can be resent (rate limiting)
  async canResendOtp(phone: string): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count FROM customer_otps 
        WHERE phone = $1 AND created_at > NOW() - INTERVAL '1 minute'
      `;
      const result = await db.queryOne(query, [phone]);
      return parseInt(result?.count || '0') < 3; // Max 3 OTPs per minute
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
  // Update customer
  async update(id: string, updateData: Partial<Customer>): Promise<Customer> {
    try {
      const { query, params } = QueryBuilder.buildUpdateQuery('customers', updateData, { id }, ['*']);
      const customers = await db.query<Customer>(query, params);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Get customers with pagination
  async findAll(
    page: number = 1,
    limit: number = 20,
    filters?: {
      level?: string;
      isActive?: boolean;
      search?: string;
    }
  ): Promise<PaginatedResponse<Customer>> {
    try {
      const offset = (page - 1) * limit;
      let whereClause = '';
      const params: any[] = [];
      let paramIndex = 1;

      // Build WHERE clause
      const conditions: string[] = [];
      
      if (filters?.level) {
        conditions.push(`level = $${paramIndex++}`);
        params.push(filters.level);
      }
      
      if (filters?.isActive !== undefined) {
        conditions.push(`is_active = $${paramIndex++}`);
        params.push(filters.isActive);
      }
      
      if (filters?.search) {
        conditions.push(`(first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR phone ILIKE $${paramIndex})`);
        params.push(`%${filters.search}%`);
        paramIndex++;
      }

      if (conditions.length > 0) {
        whereClause = `WHERE ${conditions.join(' AND ')}`;
      }

      // Get total count
      const countQuery = `SELECT COUNT(*) as total FROM customers ${whereClause}`;
      const countResult = await db.queryOne(countQuery, params);
      const total = parseInt(countResult?.total || '0');

      // Get customers
      const dataQuery = `
        SELECT * FROM customers 
        ${whereClause}
        ORDER BY created_at DESC 
        LIMIT $${paramIndex++} OFFSET $${paramIndex++}
      `;
      params.push(limit, offset);
      
      const customers = await db.query<Customer>(dataQuery, params);

      return {
        data: customers,
        pagination: {
          page,
          limit,
          total,
          total_pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Soft delete customer
  async softDelete(id: string): Promise<Customer> {
    try {
      const { query, params } = QueryBuilder.buildUpdateQuery(
        'customers',
        { is_active: false },
        { id },
        ['*']
      );
      const customers = await db.query<Customer>(query, params);
      return customers[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Hard delete customer (use with caution)
  async delete(id: string): Promise<void> {
    try {
      const { query, params } = QueryBuilder.buildDeleteQuery('customers', { id });
      await db.query(query, params);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Update last login
  async updateLastLogin(id: string): Promise<void> {
    try {
      const query = `
        UPDATE customers 
        SET last_login = NOW(), updated_at = NOW()
        WHERE id = $1
      `;
      await db.query(query, [id]);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Get customer subscription
  async getCustomerSubscription(customerId: string): Promise<CustomerSubscription | null> {
    try {
      const query = `
        SELECT * FROM customer_subscriptions 
        WHERE customer_id = $1 AND status = 'active'
        ORDER BY created_at DESC 
        LIMIT 1
      `;
      return await db.queryOne<CustomerSubscription>(query, [customerId]);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Create customer subscription
  async createSubscription(subscriptionData: { // With 4-digit OTP verification
    customerId: string;
    level: 'silver' | 'gold';
    billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
    price: number;
    startedAt: Date;
    expiresAt: Date;
    paymentMethod?: string;
  }): Promise<CustomerSubscription> {
    try {
      const { query, params } = QueryBuilder.buildInsertQuery('customer_subscriptions', {
        customer_id: subscriptionData.customerId,
        level: subscriptionData.level,
        billing_cycle: subscriptionData.billingCycle,
        price: subscriptionData.price,
        started_at: subscriptionData.startedAt,
        expires_at: subscriptionData.expiresAt,
        payment_method: subscriptionData.paymentMethod,
        status: 'active',
        otp_verified: true, // Verified with 4-digit OTP
      }, ['*']);

      const subscriptions = await db.query<CustomerSubscription>(query, params);
      
      // Update customer level
      await this.updateLevel(subscriptionData.customerId, subscriptionData.level);
      
      return subscriptions[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  // Order Management
  async createOrder(orderData: {
    customerId: string;
    merchantId: string;
    orderQrCode: string;
    merchantQrCode: string;
    expiresAt: Date;
  }): Promise<Order> {
    try {
      const { query, params } = QueryBuilder.buildInsertQuery('orders', {
        customer_id: orderData.customerId,
        merchant_id: orderData.merchantId,
        order_qr_code: orderData.orderQrCode,
        merchant_qr_code: orderData.merchantQrCode,
        status: 'pending',
        currency: 'TND',
        expires_at: orderData.expiresAt,
      }, ['*']);

      const orders = await db.query<Order>(query, params);
      return orders[0];
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async findOrderByCode(orderQrCode: string): Promise<Order | null> {
    try {
      const query = `
        SELECT * FROM orders 
        WHERE order_qr_code = $1 AND status = 'pending' AND expires_at > NOW()
        LIMIT 1
      `;
      return await db.queryOne<Order>(query, [orderQrCode]);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async confirmOrder(orderId: string, totalAmount: number, items: Array<{name: string, price: number, quantity: number}>): Promise<Order> {
    try {
      return await db.transaction(async (client) => {
        // Update order
        const updateQuery = `
          UPDATE orders 
          SET status = 'confirmed', total_amount = $1, confirmed_at = NOW(), updated_at = NOW()
          WHERE id = $2
          RETURNING *
        `;
        const orders = await client.query(updateQuery, [totalAmount, orderId]);
        
        // Add order items
        for (const item of items) {
          await client.query(`
            INSERT INTO order_items (order_id, name, price, quantity)
            VALUES ($1, $2, $3, $4)
          `, [orderId, item.name, item.price, item.quantity]);
        }
        
        return orders.rows[0];
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}