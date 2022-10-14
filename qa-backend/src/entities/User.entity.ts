import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

enum STATUS {
  ACTIVE = "active",
  BLOCK = "block",
}
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  setCreated() {
    this.createdAt = new Date();
  }

  @Column()
  name: string;

  @Column({ default: false })
  is_super_admin: boolean;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "simple-enum",
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status;

  @Column({
    type: "simple-enum",
    enum: GENDER,
    default: GENDER.MALE,
  })
  gender;

  @Column({ type: "date" })
  createdAt;
}
