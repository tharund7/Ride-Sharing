import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto'

import { User } from '../models/user';
import { UserSchemaValidate, LoginSchemaValidate } from '../models/user';
import { configKeys } from '../config/configKeys';
import { sendEmail } from '../helpers/emailHelper';

import { Notification } from '../models/notification';

class UserController {
    async createUser(req: Request, res: Response) {
        const data = req.body;

        const defaultRole = 'rider';

        const { error, value } = UserSchemaValidate.validate(data);

        if (error) {
            res.status(400).json({message: error.message});
        } else {
            try {
                const isEmailAlreadyExist = await User.findOne({ email: value.email });

                if (isEmailAlreadyExist) {
                    return res.status(400).json({ message: 'Email already exists' });
                }

                const hashedPassword = await bcrypt.hash(value.password, 10);
                value.password = hashedPassword;

                const newUser = await User.create(value);

                await newUser.save();

                res.status(201).json({ message: 'User registered successfully. Please check your email for verification instructions.' });
            } catch (error) {
                console.log(error);
                res.status(500).json({message: 'Internal Server Error'});
            }
        }
    }

    async loginUser(req: Request, res: Response) {
        const data = req.body;

        const { error, value } = LoginSchemaValidate.validate(data);

        if (error) {
            res.status(400).json({message: error.message});
        } else {
            try {
                const user = await User.findOne({ email: value.email });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const passwordMatch = await bcrypt.compare(value.password, user.password);

                if (!passwordMatch) {
                    return res.status(401).json({message: 'Wrong password'});
                }

                const token = jwt.sign({ _id: user?._id, email: user?.email, role: user?.role, first_name: user?.first_name, last_name: user?.last_name }, (`${configKeys.jwt.secretKey}`), {
                    expiresIn: '1d',
                });

                const notificationData ={
                   is_read: false,
                   message: 'You have successfully logged in.',
                   user_id: user?._id,
                };

                await Notification.create(notificationData);

                res.status(200).json({
                    success: true,
                    message: 'Login Success',
                    token: token,
                });

            } catch (error) {
                console.log(error);
                res.status(500).json({message: 'Internal Server Error'});
            }
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find({});
            res.json({users});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error' });
        }
    }

    async getAUser(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const user = await User.findById({ _id: id });

            if (!user) {
                return res.status(404).json({message: 'User not available'});
            }

            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Internal Server Error'});
        }
    }

    async updateUser(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

            if (!user) {
                return res.status(404).json({message: 'User not available'});
            }

            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetExpires = new Date();
            resetExpires.setHours(resetExpires.getHours() + 1);

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetExpires;
            await user.save();

            const emailSubject = 'Password Reset';
            const emailText =`Click the following link to reset your password: "{https://react-vite-app-ashen.vercel.app/resetpassword/${resetToken}}">`;
            await sendEmail(user.email, emailSubject, emailText);

            res.status(200).json({message: 'Reset token generated successfully'})

        } catch (error) {
            console.log(error);
            res.status(500).json({message: ' Internal Server Error'})
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { resetToken } = req.params;
        const { newPassword } = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken: resetToken,
                resetPasswordExpires: { $gt: new Date() },
            });

            if (!user) {
                return res.status(400).json({message: 'Invalid or expired reset token'});
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return res.json({message: 'Password reset successfully'})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async updateUserRole(req: Request, res:Response) {
        const id = req.params.id;
        const newRole = req.body.role;
        
        if (req.user?.role !== 'admin') {
            return res.status(403).json({message: 'Forbidden: Only admin can update user role'});
        }

        try {
            const user = await User.findByIdAndUpdate({ _id:id }, { role: newRole }, { new: true });
            if (!user) {
                return res.status(404).json({message: 'User not available'});
            }
            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server error'})
        }
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({message: 'User not available'});
            }

            res.json({message: 'User deleted'});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
}

export const userController = new UserController();