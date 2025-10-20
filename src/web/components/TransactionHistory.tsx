import React from 'react';
import { ChevronLeft, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  merchantName: string;
  amount: number;
  type: 'purchase' | 'deal_purchase';
  status: 'completed' | 'pending' | 'failed' | 'installment';
  date: string;
  pointsEarned: number;
  pointsSpent?: number;
  installments?: {
    total: number;
    paid: number;
    nextDue?: string;
    monthlyAmount: number;
  };
}

interface TransactionHistoryProps {
  onBack: () => void;
}

export default function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      merchantName: 'H&M',
      amount: 150,
      type: 'purchase',
      status: 'completed',
      date: '2024-01-15',
      pointsEarned: 25,
    },
    {
      id: 'TXN002',
      merchantName: 'Mango Deal',
      amount: 0,
      type: 'deal_purchase',
      status: 'completed',
      date: '2024-01-14',
      pointsEarned: 0,
      pointsSpent: 120,
    },
    {
      id: 'TXN003',
      merchantName: 'TunisiaNet',
      amount: 800,
      type: 'purchase',
      status: 'installment',
      date: '2024-01-10',
      pointsEarned: 80,
      installments: {
        total: 4,
        paid: 2,
        nextDue: '2024-02-10',
        monthlyAmount: 200
      }
    },
    {
      id: 'TXN004',
      merchantName: 'Decathlon',
      amount: 300,
      type: 'purchase',
      status: 'pending',
      date: '2024-01-08',
      pointsEarned: 30,
    },
    {
      id: 'TXN005',
      merchantName: 'Carrefour Deal',
      amount: 0,
      type: 'deal_purchase',
      status: 'completed',
      date: '2024-01-07',
      pointsEarned: 0,
      pointsSpent: 300,
    },
    {
      id: 'TXN006',
      merchantName: 'Bershka',
      amount: 120,
      type: 'purchase',
      status: 'failed',
      date: '2024-01-05',
      pointsEarned: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'installment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      case 'installment':
        return 'Installment';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'installment':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
          <h1 className="text-xl font-semibold">Transaction History</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">
              {transactions.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">
              {transactions.reduce((sum, t) => sum + t.pointsEarned, 0)}
            </div>
            <div className="text-sm text-gray-500">Points Earned</div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {getStatusIcon(transaction.status)}
                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold text-gray-800">{transaction.merchantName}</h3>
                    <p className="text-sm text-gray-500">ID: {transaction.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    {transaction.type === 'deal_purchase' ? 'Offre' : `${transaction.amount} TND`}
                  </div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </span>
                  {transaction.pointsEarned > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      +{transaction.pointsEarned} points
                    </span>
                  )}
                  {transaction.pointsSpent && transaction.pointsSpent > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      -{transaction.pointsSpent} points
                    </span>
                  )}
                </div>
              </div>

              {/* Installment Details */}
              {transaction.installments && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-blue-800">
                      Installment Plan
                    </span>
                    <span className="text-sm text-blue-600">
                      {transaction.installments.paid}/{transaction.installments.total} paid
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(transaction.installments.paid / transaction.installments.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-blue-600">
                    <span>{transaction.installments.monthlyAmount} TND/month</span>
                    {transaction.installments.nextDue && (
                      <span>Next: {transaction.installments.nextDue}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full mt-6 py-3 text-blue-500 font-medium hover:bg-blue-50 rounded-lg transition-colors">
          Load More Transactions
        </button>
      </div>
    </div>
  );
}