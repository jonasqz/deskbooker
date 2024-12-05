import { db } from './init.js';

const seedData = {
  users: [
    {
      id: "u1",
      name: "John Doe",
      email: "admin@example.com",
      password: "admin123", // In production, this should be hashed
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      isAdmin: true
    },
    {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
      department: "Design",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
      isAdmin: false
    }
  ],
  offices: [
    {
      id: "o1",
      name: "Main Office",
      address: "123 Business Street"
    }
  ],
  floors: [
    {
      id: "f1",
      officeId: "o1",
      number: 1,
      name: "First Floor"
    }
  ],
  wings: [
    {
      id: "w1",
      floorId: "f1",
      name: "North Wing"
    }
  ],
  desks: [
    {
      id: "d1",
      name: "Desk A1",
      wingId: "w1",
      floorId: "f1",
      officeId: "o1"
    }
  ],
  bookings: []
};

const seed = async () => {
  try {
    await db.read();
    db.data = seedData;
    await db.write();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seed(); 