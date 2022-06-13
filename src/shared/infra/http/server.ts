import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction, response} from 'express';
import 'express-async-errors';

import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError'
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err.message);

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Errror',
    });
})

app.listen(3333, () => {
    console.log("Server run on port 3333");
})