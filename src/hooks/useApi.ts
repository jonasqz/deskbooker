import { useState, useEffect } from 'react';
import * as api from '../api';
import type { Desk } from '../types/desk';
import type { User } from '../types/user';

export const useDesks = () => {
  const [desks, setDesks] = useState<Desk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDesks = async () => {
      try {
        const data = await api.getDesks();
        setDesks(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch desks'));
      } finally {
        setLoading(false);
      }
    };

    fetchDesks();
  }, []);

  return { desks, loading, error, setDesks };
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};