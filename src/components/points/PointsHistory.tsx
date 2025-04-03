
import React from 'react';
import { PointTransaction } from '@/data/pointsData';
import { Calendar, Clock, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PointsHistoryProps {
  transactions: PointTransaction[];
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions }) => {
  const { getUserBookings } = useAuth();
  const bookings = getUserBookings();
  
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No point transactions yet.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Find booking details for a transaction if it exists
  const getBookingDetails = (transaction: PointTransaction) => {
    // Look for a booking that matches this transaction based on description
    if (transaction.category !== 'facility') return null;
    
    const booking = bookings.find(b => 
      transaction.description.includes(b.resourceName) && 
      transaction.date === new Date(b.bookingTime).toISOString()
    );
    
    return booking;
  };

  // Check if a booking is in cooldown
  const isBookingInCooldown = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return false;
    
    return Date.now() < booking.cooldownUntil;
  };
  
  // Format remaining cooldown time
  const formatCooldownTime = (endTime: number) => {
    const remainingMs = endTime - Date.now();
    if (remainingMs <= 0) return "Ready to book again";
    
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    
    return `${minutes}m ${seconds}s remaining`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Transaction History</h3>
      <div className="space-y-6">
        {transactions.map((transaction) => {
          const bookingDetails = getBookingDetails(transaction);
          const inCooldown = bookingDetails ? isBookingInCooldown(bookingDetails.id) : false;
          
          return (
            <div 
              key={transaction.id}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-lg">{transaction.description}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatTime(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${transaction.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.points >= 0 ? '+' : ''}{transaction.points} points
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 mt-2">
                <div className="flex items-center mb-1">
                  <span className="font-medium mr-2">Category:</span>
                  <span className="capitalize">{transaction.category}</span>
                </div>
                {transaction.details && (
                  <div>
                    <span className="font-medium mr-2">Details:</span>
                    <span>{transaction.details}</span>
                  </div>
                )}
                {bookingDetails && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Time Slot:</span>
                      <span>{bookingDetails.timeSlot}</span>
                    </div>
                    {inCooldown && (
                      <div className="flex items-center mt-1 text-amber-600">
                        <Timer className="h-4 w-4 mr-1" />
                        <span>Cooldown: {formatCooldownTime(bookingDetails.cooldownUntil)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
