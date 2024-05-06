import { Request, Response } from 'express';
import { Ride_Assignment, Ride_AssignmentSchemaValidate } from '../models/ride_assignment';

class RideAssignmentController {
  async createRideAssignment(req: Request, res: Response) {
    const data = req.body;

    const { error, value } = Ride_AssignmentSchemaValidate.validate(data);

    if (error) {
      res.status(400).json({message: error.message});
    } else {
      try {
        const newRideAssignment = await Ride_Assignment.create(value);
        res.status(201).json(newRideAssignment);
      } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }
  }

  async getRideAssignments(req: Request, res: Response) {
    try {
      const rideAssignments = await Ride_Assignment.find({});
      res.json(rideAssignments);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getRideAssignmentById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const rideAssignment = await Ride_Assignment.findById(id);

      if (!rideAssignment) {
        return res.status(404).json({message: 'Ride assignment not available'});
      }

      res.json({rideAssignment});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getRideAssignmentByRequestId(req: Request, res: Response) {
    const rideRequestId = req.params.rideRequestId; 
    try {
      const rideAssignment = await Ride_Assignment.findOne({ ride_request_id: rideRequestId });

      if (!rideAssignment) {
        return res.status(404).json({ message: 'Ride assignment not found for the specified ride request id' });
      }

      res.json( rideAssignment );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateRideAssignment(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const updatedRideAssignment = await Ride_Assignment.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedRideAssignment) {
        return res.status(404).json({message: 'Ride assignment not available'});
      }

      res.json(updatedRideAssignment);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async deleteRideAssignment(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const deletedRideAssignment = await Ride_Assignment.findByIdAndDelete(id);

      if (!deletedRideAssignment) {
        return res.status(404).json({message: 'Ride assignment not available'});
      }

      res.json({message: 'Ride assignment deleted'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

export const rideAssignmentController = new RideAssignmentController();
