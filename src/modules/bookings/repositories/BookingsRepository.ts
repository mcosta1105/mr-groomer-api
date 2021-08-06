import Booking from '../infra/typeorm/entities/Booking';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Booking)
class BookingsRepository extends Repository<Booking> {
  public async findByDate(date: Date): Promise<Booking | null> {
    const findBooking = await this.findOne({
      where: { date },
    });
    return findBooking || null;
  }
}

export default BookingsRepository;
