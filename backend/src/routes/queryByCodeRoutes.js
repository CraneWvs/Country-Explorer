// backend/src/routes/queryByNameRoutes.js

import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/api/countries/code/:code', async (req, res) => {
  const countryCode = req.params.code.trim();

  if (!countryCode) {
    return res.status(404).json({ status: 404, message: "Not Found" });
  }

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Rest Countries API 返回的 404 错误
      res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      // 其他类型的错误（如网络问题或服务器不可用）
      res.status(500).json({ status: 500, message: "There is something wrong with our database..." });
    }
  }
});

export default router;
