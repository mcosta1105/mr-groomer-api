import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Booking from '../models/Booking';
import BookingRepository from '../repositories/BookingsRepository';

interface Request {
  groomer: string;
  date: Date;
}

class CreateBookingService {
  public async execute({ date, groomer }: Request): Promise<Booking> {
    const bookingRepository = getCustomRepository(BookingRepository);

    const bookingDate = startOfHour(date);

    const findBookingInSameDate = await bookingRepository.findByDate(
      bookingDate,
    );

    if (findBookingInSameDate) {
      throw Error('This time has already been booked');
    }

    const booking = bookingRepository.create({
      groomer,
      date: bookingDate,
    });

    await bookingRepository.save(booking);
    return booking;
  }
}

export default CreateBookingService;
