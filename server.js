import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

const app = express();

// Load environment variables from .env file
config();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

// Start server only when we have a valid connection
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    // Optionally, you can exit the process here if you want to prevent the server from starting
    process.exit(1);
  });
