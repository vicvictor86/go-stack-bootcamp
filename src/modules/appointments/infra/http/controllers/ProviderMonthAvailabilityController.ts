import { Request, Response } from "express";
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityServices from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const listProvidersMonthAvailability = container.resolve(ListProviderMonthAvailabilityServices);

        const availability = await listProvidersMonthAvailability.execute({ 
            provider_id,
            month,
            year,
        });

        return response.json(availability);
    }
}