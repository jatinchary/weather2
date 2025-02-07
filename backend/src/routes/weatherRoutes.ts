// server/src/routes/weatherRoutes.ts
import { Router } from 'express';
import { processWeatherData, getDailySummary } from '../controllers/weatherController';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const data = await processWeatherData();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

router.get('/summary/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const date = new Date();
    const summary = await getDailySummary(city, date);
    res.json(summary);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

export default router;
