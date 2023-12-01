import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/api/countries/name/:name', async (req, res) => {
  const countryName = req.params.name.trim();
  if (!countryName) {
    return res.status(404).json({ status: 404, message: "Not Found" });
  }
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      res.status(500).json({ status: 500, message: "There is something wrong with our database..." });
    }
  }
});

export default router;
