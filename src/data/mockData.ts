import type { User } from '../types/user';

export const mockUsers: User[] = [
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