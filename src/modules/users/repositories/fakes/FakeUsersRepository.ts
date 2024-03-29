import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 } from 'uuid';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default class FakeUsersRepository implements IUsersRepository{
    private users: User[] = [];

    public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if(except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    public async findById(id: string): Promise<User | null> {
        const findUser = this.users.find(user => user.id === id);
        return findUser || null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const findUser = this.users.find(user => user.email === email);
        return findUser || null;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: v4() }, userData);

        this.users.push(user);

        return user || null;
    }

    public async save(user: User): Promise<User>{
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

        this.users[findIndex] = user;

        return user;
    }
}