import { BaseEntity } from "./BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Test } from "./Test";
import { TestQuestionAnswer } from "./TestQuestionAnswer";

@Entity("test_submissions")
class TestSubmission extends BaseEntity {
  @ManyToOne(() => Test, (test) => test.id)
  @JoinColumn({
    name: "test_id",
  })
  test: Test;

  @ManyToOne(() => User, (taker) => taker.id)
  @JoinColumn({
    name: "taker_id",
  })
  taker: User;

  @Column({ type: "numeric" })
  grade: number;

  @Column({ type: "boolean" })
  authorReviewed: boolean;

  @OneToMany(() => TestQuestionAnswer, (answer) => answer.testSubmission)
  answers: TestQuestionAnswer[];
}

export { TestSubmission };
