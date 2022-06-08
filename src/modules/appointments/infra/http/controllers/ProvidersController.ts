import { Request, Response } from "express";
import { container } from 'tsyringe';

import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';
import UserJson from "@modules/users/dtos/IUserJsonDTO";

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const listProviders = container.resolve(ListProvidersServices);

        const providers: UserJson[] = await listProviders.execute({ 
            user_id 
        });

        providers.forEach(provider => {
            delete provider.password;
        })

        return response.json(providers);
    }
}