import React from 'react';
import { UserCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { User } from '../types/user';

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 'u3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=32&h=32&fit=crop&crop=face'
  }
];

export const UserSelector: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="relative">
      <select
        value={currentUser?.id || ''}
        onChange={(e) => {
          const selectedUser = mockUsers.find(user => user.id === e.target.value);
          setCurrentUser(selectedUser || null);
        }}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
      >
        <option value="">Select User</option>
        {mockUsers.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} - {user.department}
          </option>
        ))}
      </select>
      <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
};