import { Router } from 'express';

import ensureAutheticated from '../middlewares/ensureAutheticated';

import ProfileController from '../controllers/ProfileController';
import { celebrate, Joi, Segments } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAutheticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('old_password')),
    }
}), profileController.update);

export default profileRouter;