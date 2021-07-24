import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Booking;
