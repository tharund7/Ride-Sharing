import { Request, Response } from 'express';
import { Ride_Request, Ride_RequestSchemaValidate, Update_Ride_RequestSchemaValidate } from '../models/ride_request';
import * as geoController from '../controllers/locationController';
import { Notification } from '../models/notification';

class RideRequestController {
  async createRideRequest(req: Request, res: Response) {
    const data = req.body;

    try {
      const pickupCoordinates = await geoController.getCoordinates(data.location);
      data.pickup_latitude = pickupCoordinates.latitude;
      data.pickup_longitude = pickupCoordinates.longitude;
    } catch (error) {
      return res.status(400).json({ message: 'Error fetching pickup coordinates' });
    }

    try {
      const dropoffCoordinates = await geoController.getCoordinates(data.destination);
      data.dropoff_latitude = dropoffCoordinates.latitude;
      data.dropoff_longitude = dropoffCoordinates.longitude;
    } catch (error) {
      return res.status(400).json({ message: 'Error fetching drop-off coordinates' });
    }

    data.status = 'pending';

    const { error, value } = Ride_RequestSchemaValidate.validate(data);

    if (error) {
      res.status(400).json({message: error.message});
    } else {
      try {
        const newRideRequest = await Ride_Request.create(value);

        const notificationData = {
          user_id: newRideRequest.user_id,
          message: `New ride request: ${newRideRequest}`,
          is_read: false,
        }

        await Notification.create(notificationData);

        res.status(201).json(newRideRequest);
      } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }
  }

  async getRideRequests(req: Request, res: Response) {
    try {
      const rideRequests = await Ride_Request.find({});
      res.json(rideRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getRideRequestById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const rideRequest = await Ride_Request.findById(id);

      if (!rideRequest) {
        return res.status(404).json({message: 'Ride request not available'});
      }

      res.json(rideRequest);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getRideRequestsByUserId(req: Request, res: Response) {
    const userId = req.params.userId; 

    try {
      const rideRequests = await Ride_Request.find({ user_id: userId });
      res.json(rideRequests );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateRideRequest(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;

    const { error, value } = Update_Ride_RequestSchemaValidate.validate(data);

    if (error) {
      return res.status(400).json({ message: error.message });
    }  

    try {

      if (data.location) {
        const pickupCoordinates = await geoController.getCoordinates(data.location);
        data.pickup_latitude = pickupCoordinates.latitude;
        data.pickup_longitude = pickupCoordinates.longitude;
      }
  
      if (data.destination) {
        const dropoffCoordinates = await geoController.getCoordinates(data.destination);
        data.dropoff_latitude = dropoffCoordinates.latitude;
        data.dropoff_longitude = dropoffCoordinates.longitude;
      }
  
      const updatedRideRequest = await Ride_Request.findByIdAndUpdate(id, data, { new: true });
  
      if (!updatedRideRequest) {
        return res.status(404).json({ message: 'Ride request not available' });
      }

      res.json(updatedRideRequest);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async deleteRideRequest(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const deletedRideRequest = await Ride_Request.findByIdAndDelete(id);

      if (!deletedRideRequest) {
        return res.status(404).json({message: 'Ride request not available'});
      }

      res.json({message: 'Ride request deleted'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

}

export const rideRequestController = new RideRequestController();
