import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { EvaluationFormEntity } from "./evaluation-form.entity";
import { QuestionEntity } from "./question.entity";

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  response: string;

  @OneToOne(() => QuestionEntity)
  @JoinColumn()
  questionId: QuestionEntity;

  @ManyToOne(() => EvaluationFormEntity, (evaluation) => evaluation.answers)
  evaluationForm: EvaluationFormEntity;

  @Column()
  evaluationFormId: string;
}
