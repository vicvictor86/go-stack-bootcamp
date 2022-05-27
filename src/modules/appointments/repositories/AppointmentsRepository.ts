import Appointment from '../infra/typeorm/entities/Appointment';
import connectionSource from '@shared/infra/typeorm/index';

export const AppointmentsRepository = connectionSource.getRepository(Appointment).extend({
    async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await AppointmentsRepository.findOne({
            where:{ date }
        })
        return findAppointment || null;
    }
})