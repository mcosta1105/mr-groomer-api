import Booking from '../entities/Booking';

import { getRepository, Repository } from 'typeorm';

import IBookingsRepository from '@modules/bookings/repositories/IBookingsRepository';

import ICreateBookingDTO from '@modules/bookings/dtos/ICreateBookingDTO';

class BookingsRepository implements IBookingsRepository {
  private ormRepository: Repository<Booking>;

  constructor() {
    this.ormRepository = getRepository(Booking);
  }

  public async create({
    date,
    groomer_id,
  }: ICreateBookingDTO): Promise<Booking> {
    const booking = this.ormRepository.create({ groomer_id, date });
    await this.ormRepository.save(booking);
    return booking;
  }

  public async findByDate(date: Date): Promise<Booking | undefined> {
    const findBooking = await this.ormRepository.findOne({
      where: { date },
    });
    return findBooking || null;
  }
}

export default BookingsRepository;
