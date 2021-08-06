import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  price: number;
}
