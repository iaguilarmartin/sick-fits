require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
require('./db');

const server = createServer();

// TODO use express middleware to handle cookies (JWT)
// TODO use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    // eslint-disable-next-line no-console
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
