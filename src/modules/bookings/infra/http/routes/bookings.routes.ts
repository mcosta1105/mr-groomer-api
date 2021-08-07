import { Router } from 'express';
import { parseISO } from 'date-fns';
import isAuth from '@modules/users/infra/middlewares/auth';

import BookingsRepository from '@modules/bookings/infra/typeorm/repositories/BookingsRepository';
import CreateBookingService from '@modules/bookings/services/CreateBookingService';

const bookingsRouter = Router();
const bookingRepository = new BookingsRepository();

bookingsRouter.use(isAuth);

// bookingsRouter.get('/', async (req, res) => {
//   const bookingRepository = getCustomRepository(BookingsRepository);

//   const bookings = await bookingRepository.find();

//   return res.json(bookings);
// });

bookingsRouter.post('/', async (req, res) => {
  const { groomer_id, date } = req.body;

  const paredDate = parseISO(date);

  const createBooking = new CreateBookingService(bookingRepository);

  const booking = await createBooking.execute({
    date: paredDate,
    groomer_id,
  });

  return res.json(booking);
});

export default bookingsRouter;
