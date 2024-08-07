import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @Column({ name: 'first_name', length: 255 })
  firstName: string;
  @Column({ name: 'last_name', length: 255 })
  lastName: string;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  confirmPassword: string;
}
