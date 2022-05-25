import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAutheticated from '../middlewares/ensureAutheticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface UserJson {
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

usersRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user: UserJson = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return res.json(user);
});

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), async(req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    
    const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFileName: req.file?.filename,
    });

    return res.json(user);
})

export default usersRouter;