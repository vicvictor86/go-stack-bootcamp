import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import { celebrate, Joi, Segments } from 'celebrate';

const providersRouter = Router();

const providersContoller = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityContoller = new ProviderDayAvailabilityController();

providersRouter.use(ensureAutheticated);

providersRouter.get('/', providersContoller.index);

providersRouter.get('/:provider_id/month-availability',celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}), providerMonthAvailabilityController.index);

providersRouter.get('/:provider_id/day-availability',celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}), providerDayAvailabilityContoller.index);

export default providersRouter;