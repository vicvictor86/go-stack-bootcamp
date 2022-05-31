import User from '../entities/User';
import connectionSource from '@shared/infra/typeorm/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

const usersRepository = connectionSource.getRepository(User);

export const UsersRepository: IUsersRepository = usersRepository.extend({
    async findById(id: string): Promise<User | null> {
        const user = await usersRepository.findOne({
            where: {
                id
            }
        });
        return user;
    },

    async findByEmail(email: string): Promise<User | null> {
        const user = await usersRepository.findOne({
            where: {
                email
            }
        });
        return user;
    },

    async create(userData: ICreateUserDTO): Promise<User> {
        const users = usersRepository.create(userData);

        await usersRepository.save(users);

        return users;
    },

    async save(user: User): Promise<User>{
        return usersRepository.save(user);
    },
})