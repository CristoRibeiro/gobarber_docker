import { isEqual } from 'date-fns';
import Appointment from '../models/appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentByDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return appointmentByDate || null;
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }
}

export default AppointmentsRepository;
