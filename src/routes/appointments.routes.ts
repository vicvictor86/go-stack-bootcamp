import { Router } from 'express';
import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAutheticated from '../middlewares/ensureAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.get('/', async (req, res) => {
    console.log(req.user);
    const appointments = await AppointmentsRepository.find();
    return res.json(appointments);
})

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({ provider_id, date : parsedDate });

        return res.json(appointment);
    } catch(err) {
        return res.status(400).json({ error: (err as Error).message });
    }
});

export default appointmentsRouter;