import UserToken from '../entities/UserToken';
import connectionSource from '@shared/infra/typeorm/index';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

const userTokenRepository = connectionSource.getRepository(UserToken);

export const UserTokensRepository: IUserTokensRepository = userTokenRepository.extend({
    async findByToken(token: string): Promise<UserToken | undefined>{
        const userToken = await userTokenRepository.findOne({
            where: { token },
        })

        return userToken || undefined;
    },

    async generate(user_id: string): Promise<UserToken> {
        const userToken = userTokenRepository.create({
            user_id,
        });

        await userTokenRepository.save(userToken);

        return userToken;
    },
})