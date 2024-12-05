import React from 'react';
import { MapPin } from 'lucide-react';
import type { Desk } from '../types/desk';
import { BookingDetails } from './BookingDetails';

interface DeskListProps {
  desks: Desk[];
  onDeskSelect: (desk: Desk) => void;
  selectedDate: string;
}

export const DeskList: React.FC<DeskListProps> = ({ desks, onDeskSelect, selectedDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {desks.map((desk) => {
        const todaysBookings = desk.bookings?.filter(booking => booking.date === selectedDate) || [];
        
        return (
          <div
            key={desk.id}
            className={`p-4 rounded-lg border ${
              desk.isAvailable
                ? 'border-green-200 bg-green-50 hover:bg-green-100'
                : 'border-red-200 bg-red-50'
            } transition-colors ${desk.isAvailable ? 'cursor-pointer' : ''}`}
            onClick={() => desk.isAvailable && onDeskSelect(desk)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{desk.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  desk.isAvailable
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {desk.isAvailable ? 'Available' : 'Booked'}
              </span>
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{desk.location}</span>
            </div>
            
            {todaysBookings.length > 0 && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Today's Bookings:</h4>
                {todaysBookings.map(booking => (
                  <BookingDetails key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};