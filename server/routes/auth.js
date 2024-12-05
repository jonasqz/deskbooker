import { Router } from 'express';
import { db } from '../db/init.js';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = 'your-secret-key';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/login', async (req, res) => {
  try {
    const credentials = LoginSchema.parse(req.body);
    await db.read();
    
    const user = db.data.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        avatar: user.avatar,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
});

export { router as authRouter };