import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

export const apiRouter = Router();

// In Stage 1 / Stage 2 transition, we provide mock database fallback if Prisma client is compiling
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    archive: 'The Dimly Lit Library API',
    stage: 'Stage 1 Complete, Stage 2 Ready for Migration',
  });
});

/**
 * Public Endpoints
 */
apiRouter.get('/book', async (_req: Request, res: Response) => {
  res.json({
    message: 'Stage 2 Prisma Query: Book with Chapters and Entries',
  });
});

apiRouter.get('/lesson-of-the-night', async (_req: Request, res: Response) => {
  res.json({
    message: 'Random introspective reflection selector',
  });
});

/**
 * Admin Authentication Endpoint
 */
apiRouter.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'thejaswi';
  const adminPass = process.env.ADMIN_PASSWORD || 'supersecretpassword123';

  if (username === adminUser && password === adminPass) {
    const secret = process.env.JWT_SECRET || 'melodramatic-library-secret';
    const token = jwt.sign(
      { userId: 'admin-01', username, role: 'ADMIN' },
      secret,
      { expiresIn: '7d' }
    );
    res.json({ token, username, role: 'ADMIN' });
    return;
  }

  res.status(401).json({ error: 'Invalid scribe credentials.' });
});

/**
 * Protected Endpoints (Admin Scribe Study)
 */
apiRouter.post('/chapters', authenticateToken, async (_req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Create Chapter (Stage 3)' });
});

apiRouter.put('/chapters/:id', authenticateToken, async (_req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Update Chapter (Stage 3)' });
});

apiRouter.post('/entries', authenticateToken, async (_req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Create Entry (Stage 3)' });
});

apiRouter.put('/entries/:id', authenticateToken, async (_req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Update Entry (Stage 3)' });
});
