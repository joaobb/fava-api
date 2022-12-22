import { BaseEntity } from "./BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Test } from "./Test";
import { Automata } from "./Automata";
import { TestSubmission } from "./TestSubmission";

@Entity("tests_questions_answers")
class TestQuestionAnswer extends BaseEntity {
  @ManyToOne(() => TestSubmission, (submission) => submission.id)
  @JoinColumn({
    name: "test_submission_id",
  })
  testSubmission: TestSubmission;

  @ManyToOne(() => Automata, (automata) => automata.id)
  @JoinColumn({
    name: "automata_id",
  })
  questionAutomata: Automata;

  @Column({ type: "text" })
  answerSource: string;

  @Column({ type: "boolean" })
  correct: boolean;
}

export { TestQuestionAnswer };
