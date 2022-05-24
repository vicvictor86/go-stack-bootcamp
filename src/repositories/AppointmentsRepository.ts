import Appointment from '../models/Appointment';
import connectionSource from '../database/index';

export const AppointmentsRepository = connectionSource.getRepository(Appointment).extend({
    async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await AppointmentsRepository.findOne({
            where:{ date }
        })
        return findAppointment || null;
    }
})