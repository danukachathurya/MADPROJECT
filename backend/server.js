require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) throw new Error('MONGO_URI and JWT_SECRET must be configured in .env');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Student Forum API is running' }));
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use(notFound);
app.use(errorHandler);

connectDatabase().then(() => app.listen(process.env.PORT || 5000, () => console.log(`API listening on port ${process.env.PORT || 5000}`))).catch((error) => { console.error('Database connection failed', error); process.exit(1); });
