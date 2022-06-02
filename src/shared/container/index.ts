import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerInstance<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerInstance<IUsersRepository>('UsersRepository', UsersRepository);