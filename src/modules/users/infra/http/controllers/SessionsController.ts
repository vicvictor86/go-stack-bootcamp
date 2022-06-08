import { Request, Response } from "express";
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import UserJson from "@modules/users/dtos/IUserJsonDTO";

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUserService.execute({
            email, 
            password
        });

        const userWithoutPassword = user as UserJson;

        delete userWithoutPassword.password;

        return response.json({ user : userWithoutPassword, token });
    }
}