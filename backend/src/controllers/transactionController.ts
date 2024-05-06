import { Request, Response } from 'express';
import { Transaction, TransactionSchemaValidate } from '../models/transaction';
import { Notification } from '../models/notification';

class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const data = req.body;

    const { error, value } = TransactionSchemaValidate.validate(data);

    if (error) {
      res.status(400).json({message: error.message});
    } else {
      try {
        const existingTransaction = await Transaction.findOne({ ride_id: value.ride_id });

        if (existingTransaction) {
          return res.status(400).json({message: 'Transaction already exists'});
        } else {
          const newTransaction = await Transaction.create(value);

          const notificationData = {
            is_read: false,
            message: 'You have created new transaction for ride ' + value.ride_id,
            user_id: value.user_id,
          }

          await Notification.create(notificationData);

          res.status(201).json({message: 'newTransaction created'});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find({});
      res.json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error'});
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const transaction = await Transaction.findById(id);

      if (!transaction) {
        return res.status(404).json({message: 'Transaction not available'});
      }

      res.json(transaction);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getTransactionsByRideId(req: Request, res: Response) {
    const rideId = req.params.rideId;

    try {
      const transactions = await Transaction.find({ ride_id: rideId });

      res.json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedTransaction) {
        return res.status(404).json({message: 'Transaction not available'});
      }

      res.json(updatedTransaction);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async updateTransactionByRideId(req: Request, res: Response) {
    const rideId = req.params.rideId;

    try {
      const updatedTransaction = await Transaction.findOneAndUpdate(
        { ride_id: rideId },
        req.body,
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not available for the provided rideId' });
      }

      const notificationData = {
        is_read: false,
        message: 'You have updated transaction for ride ' + updatedTransaction.ride_id,
        user_id: updatedTransaction.payer_id,
      }

      await Notification.create(notificationData);

      res.json(updatedTransaction);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const deletedTransaction = await Transaction.findByIdAndDelete(id);

      if (!deletedTransaction) {
        return res.status(404).json({message: 'Transaction not available'});
      }

      res.json({message: 'Transaction deleted'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

export const transactionController = new TransactionController();
