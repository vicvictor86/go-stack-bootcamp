import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import { AppointmentsRepository } from "../repositories/AppointmentsRepository";

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request) : Promise<Appointment>{
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = await AppointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentsInSameDate){
            throw new Error("This appointmente is already boooked");
        }

        const appointment = AppointmentsRepository.create({ 
            provider_id,
            date: appointmentDate
        });

        await AppointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;