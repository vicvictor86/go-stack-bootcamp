import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';

import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import { inject, injectable } from "tsyringe";

interface Request{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async execute({ name, email, password }: Request) : Promise<User>{
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Email already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password : hashedPassword
        });

        return user;
    }
}

export default CreateUserService;