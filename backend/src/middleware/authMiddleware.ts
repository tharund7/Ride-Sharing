import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { configKeys } from '../config/configKeys';

//Extend the Request type to include the 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: {_id:string; email: string; role: string};
        }
    }
}
export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) return res.status(401).json({err: 'Access denied'});

        const decoded = jwt.verify(token, `${configKeys.jwt.secretKey}`) as { _id: string; email: string; role: string };
        req.user = decoded;

        next(); 
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}