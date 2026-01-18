import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const data = await storage.getServices();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
