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

export enum semesterType {
  بهاری = "بهاری",
  خزانی = "خزانی",
}

@Entity()
export class EvaluationFormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  semester: number;

  @Column({
    type: "simple-enum",
    nullable: false,
    enum: semesterType,
  })
  semester_type: semesterType;

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
