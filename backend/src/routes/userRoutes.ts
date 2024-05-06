import express from 'express'

import { userController } from '../controllers/userController'
import { auth } from '../middleware/authMiddleware'

export const router = express.Router()

router.post('/register', userController.createUser)

router.post('/login', userController.loginUser)

router.get('/', userController.getUsers)

router.get('/:id', auth, userController.getAUser)

router.put('/:id', userController.updateUser)

router.post('/forgot-password', userController.forgotPassword)

router.post('/reset-password/:resetToken', userController.resetPassword)

router.patch('/:id', auth, userController.updateUserRole);

router.delete('/:id', userController.deleteUser)

export { router as userRouter };