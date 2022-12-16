import { BaseEntity } from "./BaseEntity";
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

class AutomataTest extends BaseEntity {
  @ManyToOne(() => User, (author) => author.id)
  @JoinColumn({
    name: "taker_id",
  })
  taker: User;

  @Column({ type: "boolean" })
  successful: boolean;

  @Column({ type: "text" })
  answerSource: string;
}

export { AutomataTest };
