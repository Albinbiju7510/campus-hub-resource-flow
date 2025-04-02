
import React, { useState } from 'react';
import { Info, Users, Calendar, BookOpen, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PointTransaction {
  id: string;
  description: string;
  points: number;
  category: 'event' | 'facility' | 'library' | 'store' | 'attendance' | 'academic';
  date: string;
  details?: string;
}

interface PointsHistoryProps {
  transactions: PointTransaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'event':
      return <Users className="h-5 w-5 text-purple-500" />;
    case 'facility':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'library':
      return <BookOpen className="h-5 w-5 text-green-500" />;
    case 'store':
      return <ShoppingBag className="h-5 w-5 text-orange-500" />;
    case 'attendance':
      return <Calendar className="h-5 w-5 text-indigo-500" />;
    case 'academic':
      return <Users className="h-5 w-5 text-amber-500" />;
    default:
      return <Users className="h-5 w-5 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const TransactionItem = ({ transaction }: { transaction: PointTransaction }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="py-4 hover:bg-gray-50 rounded-lg p-2 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full mr-4">
            {getCategoryIcon(transaction.category)}
          </div>
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-green-600 mr-3">+{transaction.points} pts</span>
          {transaction.details && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1" 
              onClick={() => setShowDetails(!showDetails)}
            >
              <Info className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      </div>
      
      {showDetails && transaction.details && (
        <div className="mt-3 ml-12 p-3 bg-gray-50 border-l-2 border-gray-200 text-sm text-gray-700">
          {transaction.details}
        </div>
      )}
    </div>
  );
};

const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Activity History</h3>
      <div className="divide-y">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export { PointsHistory, type PointTransaction };
