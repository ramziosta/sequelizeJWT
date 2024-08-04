import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decodedToken: any) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ message: 'Invalid token, you are not auth, please log in' });
            } else {
                console.log('Decoded Token:', decodedToken)
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};

