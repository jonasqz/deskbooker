import { Router } from 'express';
import { db } from '../db/init.js';
import { z } from 'zod';

const router = Router();

const DeskSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
});

// Get all desks with their bookings
router.get('/', (req, res) => {
  const desks = db.prepare(`
    SELECT 
      d.*,
      json_group_array(
        json_object(
          'id', b.id,
          'deskId', b.desk_id,
          'userId', b.user_id,
          'date', b.date,
          'startTime', b.start_time,
          'endTime', b.end_time
        )
      ) as bookings
    FROM desks d
    LEFT JOIN bookings b ON d.id = b.desk_id
    GROUP BY d.id
  `).all();

  // Parse bookings JSON and handle empty cases
  const desksWithBookings = desks.map(desk => ({
    ...desk,
    bookings: desk.bookings === '[null]' ? [] : JSON.parse(desk.bookings)
  }));

  res.json(desksWithBookings);
});

// Get a specific desk
router.get('/:id', (req, res) => {
  const desk = db.prepare('SELECT * FROM desks WHERE id = ?').get(req.params.id);
  if (!desk) {
    return res.status(404).json({ error: 'Desk not found' });
  }
  res.json(desk);
});

// Create a new desk
router.post('/', (req, res) => {
  try {
    const { name, location } = DeskSchema.parse(req.body);
    const result = db.prepare(
      'INSERT INTO desks (id, name, location) VALUES (?, ?, ?)'
    ).run(Math.random().toString(36).substr(2, 9), name, location);
    
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as deskRouter };