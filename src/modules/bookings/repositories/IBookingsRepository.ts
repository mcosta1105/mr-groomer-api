import Booking from '../infra/typeorm/entities/Booking';
import ICreateBookingDTO from '../dtos/ICreateBookingDTO';

export default interface IBookingsRepository {
  create(data: ICreateBookingDTO): Promise<Booking>;
  findByDate(date: Date): Promise<Booking | undefined>;
}
