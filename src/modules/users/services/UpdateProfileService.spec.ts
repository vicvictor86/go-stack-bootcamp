import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from "@shared/errors/AppError";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to update the profile',async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
        });

        expect(updateUser.name).toBe('John Trê');
        expect(updateUser.email).toBe('johntre@example.com');

    });

    it('should not be able to update the profile from non-existing user',async () => {
        expect(updateProfileService.execute({
            user_id: 'non-exsting-user-id',
            name: 'John Trê',
            email: 'johntre@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update to another user email',async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@example.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password',async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updateUser.password).toBe('123123');
    });

    it('should not be able to update without the old password',async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update with the wrong old password',async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});