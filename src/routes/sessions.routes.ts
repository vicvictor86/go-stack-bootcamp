import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

interface UserJson {
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

sessionsRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
        email, 
        password
    });

    const userWithoutPassword = user as UserJson;

    delete userWithoutPassword.password;

    return res.json({ userWithoutPassword, token });
});

export default sessionsRouter;