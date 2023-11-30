// backend/src/app.js

import express, { json } from 'express';
import cors from 'cors';
import queryByNameRoutes from './routes/queryByNameRoutes.js'
import queryByCodeRoutes from './routes/queryByCodeRoutes.js'

const app = express();

// 中间件
app.use(cors({
    origin: 'http://localhost:5173' // 您的前端应用的域名
  }));
app.use(json());
app.use(queryByNameRoutes);
app.use(queryByCodeRoutes);
// 路由
// TODO: 引入和使用路由

export default app;
