import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsServices from "./ListProviderAppointmentsService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsServices;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderAppointments = new ListProviderAppointmentsServices(fakeAppointmentsRepository);
    });

    it('should be able to list the day appointments on as specif day',async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });
        
        const appointments = await listProviderAppointments.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });
    
        expect(appointments).toEqual([
            appointment1,
            appointment2
        ])
    });
});