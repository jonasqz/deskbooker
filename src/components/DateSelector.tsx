import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/date';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <input
          type="date"
          value={selectedDate}
          min={formatDate(new Date())}
          onChange={(e) => onDateChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};