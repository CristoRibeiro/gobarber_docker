import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;
  try {
    const dateAppointment = parseISO(date);

    const appointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = appointmentService.execute({
      date: dateAppointment,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRoutes;
