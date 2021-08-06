import Booking from '../entities/Booking';

import { EntityRepository, Repository } from 'typeorm';

import IBookingsRepository from '@modules/bookings/repositories/IBookingsRepository';

@EntityRepository(Booking)
class BookingsRepository
  extends Repository<Booking>
  implements IBookingsRepository
{
  public async findByDate(date: Date): Promise<Booking | undefined> {
    const findBooking = await this.findOne({
      where: { date },
    });
    return findBooking || null;
  }
}

export default BookingsRepository;
