import { Router } from 'express';
import { db } from '../db/init.js';
import { z } from 'zod';

const router = Router();

const OfficeSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

const FloorSchema = z.object({
  officeId: z.string().min(1),
  number: z.number().int().positive(),
  name: z.string().min(1),
});

const WingSchema = z.object({
  floorId: z.string().min(1),
  name: z.string().min(1),
});

const DeskSchema = z.object({
  name: z.string().min(1),
  wingId: z.string().optional(),
  floorId: z.string().min(1),
  officeId: z.string().min(1),
});

// Offices
router.get('/offices', (req, res) => {
  const offices = db.prepare('SELECT * FROM offices').all();
  res.json(offices);
});

router.post('/offices', (req, res) => {
  try {
    const office = OfficeSchema.parse(req.body);
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare('INSERT INTO offices (id, name, address) VALUES (?, ?, ?)')
      .run(id, office.name, office.address);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Floors
router.get('/floors', (req, res) => {
  const floors = db.prepare('SELECT * FROM floors').all();
  res.json(floors);
});

router.post('/floors', (req, res) => {
  try {
    const floor = FloorSchema.parse(req.body);
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare('INSERT INTO floors (id, office_id, number, name) VALUES (?, ?, ?, ?)')
      .run(id, floor.officeId, floor.number, floor.name);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Wings
router.get('/wings', (req, res) => {
  const wings = db.prepare('SELECT * FROM wings').all();
  res.json(wings);
});

router.post('/wings', (req, res) => {
  try {
    const wing = WingSchema.parse(req.body);
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare('INSERT INTO wings (id, floor_id, name) VALUES (?, ?, ?)')
      .run(id, wing.floorId, wing.name);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Desks
router.get('/desks', (req, res) => {
  const desks = db.prepare(`
    SELECT 
      d.*,
      o.name as office_name,
      f.name as floor_name,
      w.name as wing_name
    FROM desks d
    JOIN offices o ON d.office_id = o.id
    JOIN floors f ON d.floor_id = f.id
    LEFT JOIN wings w ON d.wing_id = w.id
  `).all();
  res.json(desks);
});

router.post('/desks', (req, res) => {
  try {
    const desk = DeskSchema.parse(req.body);
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare('INSERT INTO desks (id, name, wing_id, floor_id, office_id) VALUES (?, ?, ?, ?, ?)')
      .run(id, desk.name, desk.wingId, desk.floorId, desk.officeId);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as adminRouter };