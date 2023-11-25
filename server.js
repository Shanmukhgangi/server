import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';

/** import connection file */
import connect from './database/conn.js';

const app = express();

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

/** application port */
const port = process.env.PORT || 8080;

/** routes */
app.use('/api', router); /** APIs */

app.get('/', (req, res) => {
    try {
        res.json("Get Request");
    } catch (error) {
        res.json(error);
    }
});

/** start server only when we have a valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Cannot connect to the server");
    }
}).catch(error => {
    console.error("Invalid Database Connection");
    // Optionally, you can exit the process here if you want to prevent the server from starting
    // process.exit(1);
});
