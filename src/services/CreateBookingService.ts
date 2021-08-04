import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Booking from '../models/Booking';
import BookingRepository from '../repositories/BookingsRepository';

interface Request {
  groomer_id: string;
  date: Date;
}

class CreateBookingService {
  public async execute({ date, groomer_id }: Request): Promise<Booking> {
    const bookingRepository = getCustomRepository(BookingRepository);

    const bookingDate = startOfHour(date);

    const findBookingInSameDate = await bookingRepository.findByDate(
      bookingDate,
    );

    if (findBookingInSameDate) {
      throw new AppError('This time has already been booked');
    }

    const booking = bookingRepository.create({
      groomer_id,
      date: bookingDate,
    });

    await bookingRepository.save(booking);
    return booking;
  }
}

export default CreateBookingService;
