import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DepartmentEntity } from "./department.entity";

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

  // one faculty has many departments! relationship done.

  @OneToMany(() => DepartmentEntity, (department) => department.faculty)
  departments: DepartmentEntity[];
}
