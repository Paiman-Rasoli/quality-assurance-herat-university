import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { SubjectEntity } from "./subject.entity";
import { TeacherEntity } from "./teacher.entity";

@Entity()
export class EvaluationFormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  semester: number;

  @Column()
  semester_type: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: SubjectEntity;

  @OneToOne(() => TeacherEntity, {
    nullable: false,
  })
  @JoinColumn()
  teacher: TeacherEntity;

  @OneToOne(() => SubjectEntity, {
    nullable: false,
  })
  @JoinColumn()
  subject: SubjectEntity;
}
