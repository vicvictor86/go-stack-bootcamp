import Appointment from '../entities/Appointment';
import connectionSource from '@shared/infra/typeorm/index';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

const appointmentsRepository = connectionSource.getRepository(Appointment);

export const AppointmentsRepository: IAppointmentsRepository = appointmentsRepository.extend({
    async find(): Promise<Appointment[]> {
        const appointments = await appointmentsRepository.find();
        return appointments;
    },
    
    async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await appointmentsRepository.findOne({
            where:{ date }
        })
        return findAppointment;
    },

    async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = appointmentsRepository.create({ provider_id, date });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
})