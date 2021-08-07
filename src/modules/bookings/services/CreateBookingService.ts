import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';

import Booking from '../infra/typeorm/entities/Booking';
import IBookingsRepository from '../repositories/IBookingsRepository';

interface Request {
  groomer_id: string;
  date: Date;
}

class CreateBookingService {
  constructor(private bookingRepository: IBookingsRepository) {}

  public async execute({ date, groomer_id }: Request): Promise<Booking> {
    const bookingDate = startOfHour(date);

    const findBookingInSameDate = await this.bookingRepository.findByDate(
      bookingDate,
    );

    if (findBookingInSameDate) {
      throw new AppError('This time has already been booked');
    }

    const booking = await this.bookingRepository.create({
      groomer_id,
      date: bookingDate,
    });

    return booking;
  }
}

export default CreateBookingService;
