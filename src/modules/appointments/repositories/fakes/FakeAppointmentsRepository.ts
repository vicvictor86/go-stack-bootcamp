import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';


export default class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];
    public async find(): Promise<Appointment[]> {
        return this.appointments;
    }
    
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

        return findAppointment || null;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id })

        this.appointments.push(appointment);

        return appointment;
    }
}