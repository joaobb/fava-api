import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
import { Automata } from "./Automata";

@Entity("exercises")
class Exercise extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (author) => author.id)
  @JoinColumn({
    name: "author_id",
  })
  author: User;

  @ManyToMany(() => Automata)
  @JoinTable({
    name: "exercise_automatas",
    joinColumns: [{ name: "exercise_id" }],
    inverseJoinColumns: [{ name: "automata_id" }],
  })
  automatas: Automata[];

  @Column({ type: "text", default: "public" })
  privacy: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
export { Exercise };
