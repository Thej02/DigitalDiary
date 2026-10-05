import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API mount
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    library: 'The Private Folio API Server',
    status: 'Ready',
  });
});

app.listen(PORT, () => {
  console.log(`[Library Archive] Server listening upon port ${PORT}`);
});
