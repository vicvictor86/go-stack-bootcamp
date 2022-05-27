import User from "@modules/users/infra/typeorm/entities/User";
import connectionSource from "@shared/infra/typeorm/index";
import { hash } from "bcryptjs";
import AppError from '@shared/errors/AppError';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request) : Promise<User>{
        const userRepository = connectionSource.getRepository(User);

        const userExists = await userRepository.findOne({
            where: { email },
        });

        if (userExists) {
            throw new AppError('Email already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password : hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;