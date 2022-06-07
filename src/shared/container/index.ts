import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUSerTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerInstance<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerInstance<IUsersRepository>('UsersRepository', UsersRepository);

container.registerInstance<IUSerTokensRepository>('UserTokensRepository', UserTokensRepository);