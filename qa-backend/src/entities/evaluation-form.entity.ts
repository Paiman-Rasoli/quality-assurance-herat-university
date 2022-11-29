import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { AnswerEntity } from "./answer.entity";
import { DepartmentEntity } from "./department.entity";
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

  @Column({ type: "datetime" })
  start_date: Date;

  @Column({ type: "datetime" })
  end_date: Date;

  @ManyToOne(() => TeacherEntity, {
    nullable: false,
  })
  @JoinColumn()
  teacher: TeacherEntity;

  @ManyToOne(() => SubjectEntity, {
    nullable: false,
  })
  @JoinColumn()
  subject: SubjectEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.evaluationForm)
  answers: AnswerEntity[];

  @ManyToOne(() => DepartmentEntity, {
    nullable: false,
  })
  @JoinColumn()
  department: DepartmentEntity;
}
