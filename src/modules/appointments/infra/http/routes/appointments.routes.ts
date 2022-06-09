import { Router } from 'express';

import AppointsmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';

const appointmentsRouter = Router();
const AppointmentsController = new AppointsmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.get('/', AppointmentsController.show);
appointmentsRouter.post('/', AppointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;