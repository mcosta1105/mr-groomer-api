import Booking from '../infra/typeorm/entities/Booking';

export default interface IBookingsRepository {
  findByDate(date: Date): Promise<Booking | undefined>;
}
