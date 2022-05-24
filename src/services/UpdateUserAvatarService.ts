import connectionSource from '../database/index';
import path from 'path';
import fs from 'fs';

import uploadConfig from'../config/upload';
import User from '../models/User';

interface Request{
    user_id: string;
    avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = connectionSource.getRepository(User);

        const user = await userRepository.findOne({
            where:{
                id: user_id
            }
        });

        if(!user){
            throw new Error('Only authenticated users can change avatar.');
        }

        if(user.avatar){
            const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarPath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarPath);
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;