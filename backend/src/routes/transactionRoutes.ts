import express from 'express';
import { transactionController } from '../controllers/transactionController';

const router = express.Router();

router.post('/', transactionController.createTransaction);

router.get('/', transactionController.getTransactions);

router.get('/:id', transactionController.getTransactionById);

router.get('/by-ride/:rideId', transactionController.getTransactionsByRideId);

router.put('/by-ride/:rideId', transactionController.updateTransactionByRideId);

router.put('/:id', transactionController.updateTransaction);

router.delete('/:id', transactionController.deleteTransaction);

export { router as transactionRouter };
