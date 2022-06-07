import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

interface UserJson {
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user: UserJson = await showProfile.execute( { user_id });

        delete user.password;

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user: UserJson = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        delete user.password;
        
        return response.json(user);
    } 
}