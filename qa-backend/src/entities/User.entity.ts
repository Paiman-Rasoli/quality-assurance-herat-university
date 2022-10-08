import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

enum GENDER {
  MALE = "male",
  FEMALE = "female",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  setCreated() {
    this.createdAt = new Date();
  }

  @Column()
  fullName: string;

  @Column()
  en_fullName: string;

  @Column({ default: false })
  is_super_admin: boolean;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "simple-enum",
    enum: GENDER,
    default: GENDER.MALE,
  })
  gender;

  @Column()
  code: string;

  @Column({ type: "date" })
  createdAt;
}
