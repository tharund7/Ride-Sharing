import express from 'express';
import { rideRequestController } from '../controllers/rideRequestController';

const router = express.Router();

router.post('/', rideRequestController.createRideRequest);

router.get('/', rideRequestController.getRideRequests);

router.get('/:id', rideRequestController.getRideRequestById);

router.get('/user/:userId', rideRequestController.getRideRequestsByUserId);

router.put('/:id', rideRequestController.updateRideRequest);

router.delete('/:id', rideRequestController.deleteRideRequest);

export { router as rideRequestRouter };
