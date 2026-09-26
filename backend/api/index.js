const app = require('../app');
const connectDatabase = require('../config/db');

module.exports = async (req, res) => {
  try {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
      throw new Error('MONGO_URI and JWT_SECRET must be configured');
    }

    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed', error);
    return res.status(500).json({ success: false, message: 'Service is temporarily unavailable' });
  }
};

