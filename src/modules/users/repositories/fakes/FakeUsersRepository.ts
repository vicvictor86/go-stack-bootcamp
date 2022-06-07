import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

export default class FakeUsersRepository implements IUsersRepository{
    private users: User[] = [];
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

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user || null;
    }

    public async save(user: User): Promise<User>{
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

        this.users[findIndex] = user;

        return user;
    }
}