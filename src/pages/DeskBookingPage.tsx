import React, { useState } from 'react';
import { DeskList } from '../components/DeskList';
import { BookingForm } from '../components/BookingForm';
import { DateSelector } from '../components/DateSelector';
import { UserSelector } from '../components/UserSelector';
import { UserProvider } from '../context/UserContext';
import type { Desk } from '../types/desk';
import { Building2 } from 'lucide-react';
import { formatDate } from '../utils/date';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DeskBookingPage: React.FC = () => {
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">Desk Booking System</h1>
              </div>
              <div className="flex items-center space-x-4">
                {user?.isAdmin && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6">
            {selectedDesk ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Book a Desk</h2>
                <BookingForm
                  selectedDesk={selectedDesk}
                  onSubmit={() => setSelectedDesk(null)}
                  onCancel={() => setSelectedDesk(null)}
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">Available Desks</h2>
                <DateSelector 
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
                <DeskList 
                  desks={[]} 
                  onDeskSelect={setSelectedDesk}
                  selectedDate={selectedDate}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </UserProvider>
  );
};