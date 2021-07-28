import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import BookingsRepository from '../repositories/BookingsRepository';
import CreateBookingService from '../services/CreateBookingService';

const bookingsRouter = Router();

bookingsRouter.get('/', async (req, res) => {
  const bookingRepository = getCustomRepository(BookingsRepository);

  const bookings = await bookingRepository.find();

  return res.json(bookings);
});

bookingsRouter.post('/', async (req, res) => {
  try {
    const { groomer, date } = req.body;

    const paredDate = parseISO(date);

    const createBooking = new CreateBookingService();

    const booking = await createBooking.execute({
      date: paredDate,
      groomer,
    });

    return res.json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default bookingsRouter;