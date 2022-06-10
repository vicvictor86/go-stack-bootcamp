import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { instanceToInstance } from "class-transformer";
import { inject, injectable } from 'tsyringe';

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute({ user_id }: Request): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({ 
            except_user_id: user_id,
        });

        return instanceToInstance(users);
    }
}

export default ListProvidersServices;