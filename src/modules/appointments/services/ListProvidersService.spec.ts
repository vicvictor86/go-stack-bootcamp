import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from "@shared/errors/AppError";
import ListProvidersServices from './ListProvidersServices';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersServices;
let fakeCacheProvider: FakeCacheProvider;

interface FakeUser {
    id: string;

    name: string;
    
    email: string;

    password?: string;

    avatar_url?: string | null;
}

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProvidersService = new ListProvidersServices(fakeUsersRepository, fakeCacheProvider);
    });

    it('should be able to list the profile',async () => {
        const users = [];

        const user1: FakeUser = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        users.push(user1);

        const user2: FakeUser = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johntre@example.com',
            password: '123456',
        });
        users.push(user2);

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123456',
        });

        const providers: FakeUser[] = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        providers.forEach(provider =>{
            delete provider.avatar_url;
        })

        users.forEach(user => {
            delete user.password;
        })

        expect(providers).toEqual([user1, user2]);
    });
});