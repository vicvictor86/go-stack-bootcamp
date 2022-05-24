import connectionSource from '../database/index';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Request{
    email: string;
    password: string;
};

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request) : Promise<Response> {
        const userRepository = connectionSource.getRepository(User);
        const user = await userRepository.findOne({ 
            where: {
                email
            },
        });

        if(!user) {
            throw new Error('Email/Password incorrect');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('Email/Password incorrect');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { 
            user, 
            token,
        };
    }
}

export default AuthenticateUserService;