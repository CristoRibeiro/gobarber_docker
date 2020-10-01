import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const dateAppointmentStart = startOfHour(date);

    const sameDateAppointments = this.appointmentsRepository.findByDate(
      dateAppointmentStart,
    );

    if (sameDateAppointments) {
      throw Error('This Appointment is already booked!');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: dateAppointmentStart,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
