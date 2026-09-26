const app = require('../app');
const connectDatabase = require('../config/db');

module.exports = async (req, res) => {
  try {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
      throw new Error('MONGO_URI and JWT_SECRET must be configured');
    }

    await connectDatabase();

    // Vercel routes every API method to this function. Restore the original
    // API pathname so Express can continue to use its normal route layout.
    const requestUrl = new URL(req.url, 'http://localhost');
    const route = requestUrl.searchParams.get('__route');
    if (route !== null) {
      requestUrl.searchParams.delete('__route');
      const query = requestUrl.searchParams.toString();
      req.url = `/api/${route}${query ? `?${query}` : ''}`;
      req.originalUrl = req.url;
    }

    return app(req, res);
  } catch (error) {
    console.error('Database connection failed', error);
    return res.status(500).json({ success: false, message: 'Service is temporarily unavailable' });
  }
};
