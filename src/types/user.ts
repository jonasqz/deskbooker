export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
}

export interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}