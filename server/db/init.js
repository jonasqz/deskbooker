import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);

// Default data structure
const defaultData = {
  users: [
    {
      id: "u1",
      name: "John Doe",
      email: "admin@example.com",
      password: "admin123", // In production, this should be hashed
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      isAdmin: true
    }
  ],
  desks: [],
  bookings: [],
  offices: [],
  floors: [],
  wings: []
};

export const db = new Low(adapter, defaultData);

export const initializeDatabase = async () => {
  await db.read();
  
  // If the database is empty, write the default data
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
};