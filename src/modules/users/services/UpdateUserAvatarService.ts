import path from 'path';
import fs from 'fs';

import uploadConfig from'@config/upload';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from 'tsyringe';

interface Request{
    user_id: string;
    avatarFileName: string | undefined;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if(user.avatar){
            const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarPath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarPath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;