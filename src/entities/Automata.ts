import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity("automatas")
class Automata extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  source: string;

  @ManyToOne(() => User, (author) => author.id)
  @JoinColumn({
    name: "author_id",
  })
  author: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export { Automata };
