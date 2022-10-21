import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AnswerEntity } from "./answer.entity";
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

  @OneToMany(() => AnswerEntity, (answer) => answer.evaluationForm)
  answers: AnswerEntity[];
}
