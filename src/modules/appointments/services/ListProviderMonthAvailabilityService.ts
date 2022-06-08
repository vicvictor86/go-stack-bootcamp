import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { getDate, getDaysInMonth } from "date-fns";
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface Request {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ){}

    public async execute({ provider_id, year, month }: Request): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        })

        const numbersOfDayInMonth = getDaysInMonth(month);
        
        const eachDayArray = Array.from(
            { length: numbersOfDayInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            })
            
            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });
        
        return availability;
    }
}

export default ListProviderMonthAvailabilityService;