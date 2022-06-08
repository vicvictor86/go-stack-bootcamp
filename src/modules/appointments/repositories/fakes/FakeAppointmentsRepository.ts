import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { v4 } from 'uuid';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO ';


export default class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];
    public async find(): Promise<Appointment[]> {
        return this.appointments;
    }

    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        })

        return appointments;
    }

    public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            )
        })

        return appointments;
    }
    
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

        return findAppointment || null;
    }

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: v4(), date, provider_id, user_id })

        this.appointments.push(appointment);

        return appointment;
    }
}