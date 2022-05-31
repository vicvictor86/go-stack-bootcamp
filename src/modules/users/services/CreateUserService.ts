import User from "@modules/users/infra/typeorm/entities/User";
import connectionSource from "@shared/infra/typeorm/index";
import { hash } from "bcryptjs";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";
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
        private usersRepository: IUsersRepository
    ){}

    public async execute({ name, email, password }: Request) : Promise<User>{
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('Email already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password : hashedPassword
        });

        return user;
    }
}

export default CreateUserService;