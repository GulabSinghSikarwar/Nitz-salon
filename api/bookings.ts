import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';
import { api } from '../../shared/routes';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      return res.status(201).json({ id: booking.id, message: "Booking confirmed successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(500).json({ error: 'Failed to create booking' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
