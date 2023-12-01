import express, { json } from 'express';
import cors from 'cors';
import queryByNameRoutes from './routes/queryByNameRoutes.js'
import queryByCodeRoutes from './routes/queryByCodeRoutes.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN
    // origin: 'http://localhost:5173'
    // origin: 'https://earnest-lollipop-404cf1.netlify.app'
  }));
app.use(json());
app.use(queryByNameRoutes);
app.use(queryByCodeRoutes);


export default app;
