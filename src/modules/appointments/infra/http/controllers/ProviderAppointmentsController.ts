import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import ListProviderAppointmentsServices from '@modules/appointments/services/ListProviderAppointmentsService';

export default class AppointmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;

        const listProviderAppointmentsServices = container.resolve(ListProviderAppointmentsServices);

        const appointment = await listProviderAppointmentsServices.execute({ 
            provider_id, 
            day, 
            month, 
            year,
        });

        return response.json(appointment);
    }
}