import express from 'express';
import cors from 'cors';
import venuesRouter from './routes/venues';
import bookingsRouter from './routes/bookings';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/venues', venuesRouter);
app.use('/api/bookings', bookingsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

export default app;
