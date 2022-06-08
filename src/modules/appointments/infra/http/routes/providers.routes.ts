import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';

const providersRouter = Router();

const providersContoller = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityContoller = new ProviderDayAvailabilityController();

providersRouter.use(ensureAutheticated);

providersRouter.get('/', providersContoller.index);

providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);

providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityContoller.index);

export default providersRouter;