require('dotenv').config();
const connectDatabase = require('./config/db');
const app = require('./app');

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) throw new Error('MONGO_URI and JWT_SECRET must be configured in .env');

connectDatabase()
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`API listening on port ${process.env.PORT || 5000}`)))
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });
