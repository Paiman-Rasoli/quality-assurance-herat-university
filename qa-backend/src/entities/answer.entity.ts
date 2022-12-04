import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { EvaluationFormEntity } from "./evaluation-form.entity";
import { QuestionEntity } from "./question.entity";

export enum RESPONSES {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HEIGH = 4,
  VERY_HEIGH = 5,
}
@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "simple-json",
  })
  response: Record<number, any>;

  @ManyToOne(() => EvaluationFormEntity, (evaluation) => evaluation.answers, {
    onDelete: "CASCADE",
  })
  evaluationForm: EvaluationFormEntity;

  @Column()
  evaluationFormId: string;
}
