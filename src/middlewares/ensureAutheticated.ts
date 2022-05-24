import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAutheticated(req: Request, res: Response, next: NextFunction) : void{
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        throw new Error('JSONwebtoken required');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub,
        };
        
        return next();
    } catch {
        throw new Error('Invalid JSONwebtoken');
    }
}