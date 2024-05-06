import { Request, Response } from 'express';
import { Notification, NotificationSchemaValidate } from '../models/notification';
import { User } from '../models/user';

class NotificationController {
  async createNotification(req: Request, res: Response) {
    const data = req.body;

    const { error, value } = NotificationSchemaValidate.validate(data);

    if (error) {
      return res.status(400).json({message: error.message});
    } else {
      try {
        const newNotification = await Notification.create(value);
        res.status(201).json(newNotification);
      } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }
  }

  async getNotifications(req: Request, res: Response) {
    try {
      const notifications = await Notification.find({});
      res.json(notifications);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getNotificationById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const notification = await Notification.findById(id);

      if (!notification) {
        return res.status(404).json({message: 'Notification not available'});
      }

      res.json(notification);
    } catch (error) {
      console.log(error);
      res.status(500).json({message:'Internal Server Error'});
    }
  }

  async getNotificationsByUserId(req: Request, res: Response) {
    const userId = req.params.id;

    try { 

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }

      const notifications = await Notification.find({ user_id: userId });

      const response = {
        user,
        notifications
      };

      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateNotification(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedNotification) {
        return res.status(404).json({message: 'Notification not available'});
      }

      res.json(updatedNotification);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async markAsRead(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { is_read: true },
        { new: true }
      );

      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not available' });
      }

      res.json( updatedNotification );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteNotification(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const deletedNotification = await Notification.findByIdAndDelete(id);

      if (!deletedNotification) {
        return res.status(404).json({message: 'Notification not available'});
      }

      res.json({message: 'Notification deleted'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

export const notificationController = new NotificationController();
