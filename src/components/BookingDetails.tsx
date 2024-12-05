import React from 'react';
import { Clock, User } from 'lucide-react';
import type { DeskBooking } from '../types/desk';
import { mockUsers } from '../data/mockData';

interface BookingDetailsProps {
  booking: DeskBooking;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  const user = mockUsers.find(u => u.id === booking.userId);

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
      <img
        src={user?.avatar}
        alt={user?.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <p className="font-medium">{user?.name}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{booking.startTime} - {booking.endTime}</span>
        </div>
      </div>
    </div>
  );
};