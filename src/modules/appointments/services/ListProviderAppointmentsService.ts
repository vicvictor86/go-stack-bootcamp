import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface Request {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ){}

    public async execute({ provider_id, year, month, day }: Request): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

        if(!appointments){
            appointments = await this.appointmentsRepository.findAllInDayFromProvider({
                provider_id, 
                year, 
                month, 
                day
            },);

            await this.cacheProvider.save(cacheKey, appointments);
        }

        return appointments;
    }
}

export default ListProviderAppointmentsServices;