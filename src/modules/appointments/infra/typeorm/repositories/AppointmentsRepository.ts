import Appointment from '../entities/Appointment';
import connectionSource from '@shared/infra/typeorm/index';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { Raw } from 'typeorm';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO ';

const appointmentsRepository = connectionSource.getRepository(Appointment);

export const AppointmentsRepository: IAppointmentsRepository = appointmentsRepository.extend({
    async find(): Promise<Appointment[]> {
        const appointments = await appointmentsRepository.find();
        return appointments;
    },

    async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await appointmentsRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
            }
        })

        return appointments;
    },

    async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await appointmentsRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
            }
        })

        return appointments;
    },
    
    async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await appointmentsRepository.findOne({
            where:{ date }
        })
        return findAppointment;
    },

    async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = appointmentsRepository.create({ provider_id, user_id, date });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
})