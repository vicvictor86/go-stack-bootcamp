import { Router } from 'express';

import AppointsmentController from '../controllers/AppointmentsController';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';

const appointmentsRouter = Router();
const AppointmentsController = new AppointsmentController();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.get('/', AppointmentsController.show);

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;