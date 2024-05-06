import express from 'express';
import { notificationController } from '../controllers/notificationController';

const router = express.Router();

router.post('/', notificationController.createNotification);

router.get('/', notificationController.getNotifications);

router.get('/:id', notificationController.getNotificationById);

router.get('/by-user/:id', notificationController.getNotificationsByUserId);

router.put('/:id', notificationController.updateNotification);

router.patch('/mark-as-read/:id', notificationController.markAsRead);

router.delete('/:id', notificationController.deleteNotification);

export { router as notificationRouter };
