import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';


import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { UsersRepository } from '../../typeorm/repositories/UsersRepository';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();

interface UserJson {
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter;