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
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      res.status(500).json({ status: 500, message: "There is something wrong with our database..." });
    }
  }
});

export default router;
