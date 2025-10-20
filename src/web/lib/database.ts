// Database connection and query utilities
// This file provides database connection and common query functions

import { Pool, PoolClient } from 'pg';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'taoo_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create connection pool
export const pool = new Pool(dbConfig);

// Database connection wrapper
export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = pool;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Execute a query
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  // Execute a query and return a single row
  async queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
    const rows = await this.query<T>(text, params);
    return rows.length > 0 ? rows[0] : null;
  }

  // Execute a transaction
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Close all connections
  async close(): Promise<void> {
    await this.pool.end();
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const db = Database.getInstance();

// Common query builders
export class QueryBuilder {
  // Build SELECT query with pagination
  static buildSelectQuery(
    table: string,
    columns: string[] = ['*'],
    where?: Record<string, any>,
    orderBy?: string,
    limit?: number,
    offset?: number
  ): { query: string; params: any[] } {
    let query = `SELECT ${columns.join(', ')} FROM ${table}`;
    const params: any[] = [];
    let paramIndex = 1;

    // Add WHERE clause
    if (where && Object.keys(where).length > 0) {
      const whereConditions = Object.entries(where).map(([key, value]) => {
        if (value === null) {
          return `${key} IS NULL`;
        } else if (Array.isArray(value)) {
          const placeholders = value.map(() => `$${paramIndex++}`).join(', ');
          params.push(...value);
          return `${key} IN (${placeholders})`;
        } else {
          params.push(value);
          return `${key} = $${paramIndex++}`;
        }
      });
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    // Add ORDER BY clause
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    // Add LIMIT and OFFSET
    if (limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(limit);
    }
    if (offset) {
      query += ` OFFSET $${paramIndex++}`;
      params.push(offset);
    }

    return { query, params };
  }

  // Build INSERT query
  static buildInsertQuery(
    table: string,
    data: Record<string, any>,
    returning: string[] = ['id']
  ): { query: string; params: any[] } {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`);

    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING ${returning.join(', ')}
    `;

    return { query, params: values };
  }

  // Build UPDATE query
  static buildUpdateQuery(
    table: string,
    data: Record<string, any>,
    where: Record<string, any>,
    returning: string[] = ['id']
  ): { query: string; params: any[] } {
    const setColumns = Object.keys(data);
    const setValues = Object.values(data);
    const whereColumns = Object.keys(where);
    const whereValues = Object.values(where);

    let paramIndex = 1;
    const setClause = setColumns.map(col => `${col} = $${paramIndex++}`).join(', ');
    const whereClause = whereColumns.map(col => `${col} = $${paramIndex++}`).join(' AND ');

    const query = `
      UPDATE ${table}
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING ${returning.join(', ')}
    `;

    return { query, params: [...setValues, ...whereValues] };
  }

  // Build DELETE query
  static buildDeleteQuery(
    table: string,
    where: Record<string, any>,
    returning: string[] = ['id']
  ): { query: string; params: any[] } {
    const whereColumns = Object.keys(where);
    const whereValues = Object.values(where);
    const whereClause = whereColumns.map((col, index) => `${col} = $${index + 1}`).join(' AND ');

    const query = `
      DELETE FROM ${table}
      WHERE ${whereClause}
      RETURNING ${returning.join(', ')}
    `;

    return { query, params: whereValues };
  }
}

// Utility functions
export const dbUtils = {
  // Generate UUID
  generateUUID: () => 'uuid_generate_v4()',

  // Format date for PostgreSQL
  formatDate: (date: Date): string => date.toISOString(),

  // Parse PostgreSQL timestamp
  parseTimestamp: (timestamp: string): Date => new Date(timestamp),

  // Escape SQL identifier
  escapeIdentifier: (identifier: string): string => `"${identifier.replace(/"/g, '""')}"`,

  // Build pagination metadata
  buildPaginationMeta: (page: number, limit: number, total: number) => ({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  }),
};

// Error handling
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public detail?: string,
    public constraint?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Handle PostgreSQL errors
export const handleDatabaseError = (error: any): DatabaseError => {
  if (error.code) {
    switch (error.code) {
      case '23505': // unique_violation
        return new DatabaseError(
          'Duplicate entry found',
          error.code,
          error.detail,
          error.constraint
        );
      case '23503': // foreign_key_violation
        return new DatabaseError(
          'Referenced record not found',
          error.code,
          error.detail,
          error.constraint
        );
      case '23514': // check_violation
        return new DatabaseError(
          'Data validation failed',
          error.code,
          error.detail,
          error.constraint
        );
      case '42P01': // undefined_table
        return new DatabaseError(
          'Table does not exist',
          error.code,
          error.detail
        );
      default:
        return new DatabaseError(
          error.message || 'Database operation failed',
          error.code,
          error.detail
        );
    }
  }
  return new DatabaseError(error.message || 'Unknown database error');
};