import express from 'express';
import { rideAssignmentController } from '../controllers/rideAssignmentController';

const router = express.Router();

router.post('/', rideAssignmentController.createRideAssignment);

router.get('/', rideAssignmentController.getRideAssignments);

router.get('/:id', rideAssignmentController.getRideAssignmentById);

router.get('/by-request/:rideRequestId', rideAssignmentController.getRideAssignmentByRequestId);

router.put('/:id', rideAssignmentController.updateRideAssignment);

router.delete('/:id', rideAssignmentController.deleteRideAssignment);

export { router as rideAssignmentRouter };
