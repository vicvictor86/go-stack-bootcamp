import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;

        const createAppointmentService = container.resolve(CreateAppointmentService);

        const appointment = await createAppointmentService.execute({ provider_id, user_id, date});

        return response.json(appointment);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const appointments = await AppointmentsRepository.find();
        return response.json(appointments);
    }
}