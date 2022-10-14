import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity()
export class FacultyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fa_name: string;

  @Column()
  en_name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "date" })
  createdAt;
}
