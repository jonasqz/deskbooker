import express from 'express';
import cors from 'cors';
import { deskRouter } from './routes/desks.js';
import { bookingRouter } from './routes/bookings.js';
import { userRouter } from './routes/users.js';
import { adminRouter } from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import { initializeDatabase } from './db/init.js';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Initialize database
await initializeDatabase();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/desks', deskRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});