import User from '../entities/User';
import { connectionSource } from '@shared/infra/typeorm/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { Not } from 'typeorm';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

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

    async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if(except_user_id) {
            users = await usersRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await usersRepository.find();
        }

        return users;
    }
})