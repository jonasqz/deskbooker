import { Router } from 'express';
import { db } from '../db/init.js';
import { z } from 'zod';

const router = Router();

const BookingSchema = z.object({
  deskId: z.string(),
  userId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

// Get all bookings
router.get('/', (req, res) => {
  const bookings = db.prepare(`
    SELECT 
      b.*,
      u.name as user_name,
      u.avatar as user_avatar,
      d.name as desk_name
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN desks d ON b.desk_id = d.id
  `).all();
  res.json(bookings);
});

// Create a new booking
router.post('/', (req, res) => {
  try {
    const booking = BookingSchema.parse(req.body);
    
    // Check if desk is available
    const existingBooking = db.prepare(`
      SELECT * FROM bookings 
      WHERE desk_id = ? 
      AND date = ? 
      AND ((start_time <= ? AND end_time > ?) 
      OR (start_time < ? AND end_time >= ?))
    `).get(
      booking.deskId,
      booking.date,
      booking.endTime,
      booking.startTime,
      booking.endTime,
      booking.startTime
    );

    if (existingBooking) {
      return res.status(400).json({ error: 'Desk is already booked for this time' });
    }

    const result = db.prepare(`
      INSERT INTO bookings (id, desk_id, user_id, date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      Math.random().toString(36).substr(2, 9),
      booking.deskId,
      booking.userId,
      booking.date,
      booking.startTime,
      booking.endTime
    );

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as bookingRouter };