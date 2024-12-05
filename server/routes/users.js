import { Router } from 'express';
import { db } from '../db/init.js';
import { z } from 'zod';

const router = Router();

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  department: z.string().min(1),
  avatar: z.string().url(),
});

// Get all users
router.get('/', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// Get a specific user
router.get('/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create a new user
router.post('/', (req, res) => {
  try {
    const user = UserSchema.parse(req.body);
    const result = db.prepare(
      'INSERT INTO users (id, name, email, department, avatar) VALUES (?, ?, ?, ?, ?)'
    ).run(Math.random().toString(36).substr(2, 9), user.name, user.email, user.department, user.avatar);
    
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as userRouter };