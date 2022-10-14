import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { FacultyEntity } from "./faculty.entity";

@Entity()
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fa_name: string;

  @Column({ unique: true })
  en_name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "date" })
  createdAt;
  // many departments related to one faculty.
  @ManyToOne(() => FacultyEntity, (faculty) => faculty.departments, {
    nullable: false,
  })
  faculty: FacultyEntity;

  @Column()
  facultyId: string;
}
