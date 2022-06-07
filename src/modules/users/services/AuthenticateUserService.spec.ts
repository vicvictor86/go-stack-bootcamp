import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from "@shared/errors/AppError";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider

let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to authenticate',async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('should not to be able to authenticate with non existing user',async () => {
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not to be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError);
    });
});