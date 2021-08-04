import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import isAuth from '../middlewares/auth';

import BookingsRepository from '../repositories/BookingsRepository';
import CreateBookingService from '../services/CreateBookingService';

const bookingsRouter = Router();

bookingsRouter.use(isAuth);

bookingsRouter.get('/', async (req, res) => {
  const bookingRepository = getCustomRepository(BookingsRepository);

  const bookings = await bookingRepository.find();

  return res.json(bookings);
});

bookingsRouter.post('/', async (req, res) => {
  const { groomer_id, date } = req.body;

  const paredDate = parseISO(date);

  const createBooking = new CreateBookingService();

  const booking = await createBooking.execute({
    date: paredDate,
    groomer_id,
  });

  return res.json(booking);
});

export default bookingsRouter;
