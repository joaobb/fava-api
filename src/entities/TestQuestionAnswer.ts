import { BaseEntity } from "./BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Test } from "./Test";
import { Automata } from "./Automata";

@Entity("tests_questions_answers")
class TestQuestionAnswer extends BaseEntity {
  @ManyToOne(() => Test, (test) => test.id)
  @JoinColumn({
    name: "test_id",
  })
  test: Test;

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
