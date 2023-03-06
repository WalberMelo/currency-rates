import {
  AfterInsert,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastUpdate: string;

  @Column()
  currency: string;

  @Column()
  rate: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Rate with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Rate with id', this.id);
  }
}
