import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { db } from './config/db';
import { configKeys } from './config/configKeys';

import { userRouter } from './routes/userRoutes';
import { rideRequestRouter } from './routes/rideRequestRoutes';
import { rideAssignmentRouter } from './routes/rideAssignmentRoutes';
import { reviewRatingRouter } from './routes/reviewRatingRoutes';
import { notificationRouter } from './routes/notificationRoutes';
import { transactionRouter } from './routes/transactionRoutes';
import   geoRoutes  from './routes/locationRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/ride-requests', rideRequestRouter);
app.use('/api/v1/ride-assignments', rideAssignmentRouter);
app.use('/api/v1/review-ratings', reviewRatingRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/locations', geoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

db.then(() => {
  app.listen(configKeys.port, () => {
    console.log(`Server is running on port ${configKeys.port}🚀`);
})
});