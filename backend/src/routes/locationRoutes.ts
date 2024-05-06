import express, { Request, Response } from 'express';
import * as geoController from '../controllers/locationController';

const router = express.Router();

router.post('/getCoordinates', async (req: Request, res: Response) => {
  try {
    const { location, destination } = req.body;

    const locationData = await geoController.getCoordinates(location);
    const destinationData = await geoController.getCoordinates(destination);

    res.json({
      location,
      destination,
      pickup_latitude: locationData.latitude,
      pickup_longitude: locationData.longitude,
      dropoff_latitude: destinationData.latitude,
      dropoff_longitude: destinationData.longitude,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

