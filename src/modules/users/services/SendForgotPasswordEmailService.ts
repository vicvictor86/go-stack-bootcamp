import path from 'path';
import AppError from '@shared/errors/AppError';

import IUsersRepository from "../repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProviders/models/IMailProvider";
import IUSerTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest{
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUSerTokensRepository,
    ){}

    public async execute({ email }: IRequest) : Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists.');
        }

        const { token } = await this.userTokensRepository.generate(user.id);
        
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendEmail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;