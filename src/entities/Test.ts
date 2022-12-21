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

@Entity("tests")
class Test extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "author_id",
  })
  author: User;

  @ManyToMany(() => Automata)
  @JoinTable({
    name: "test_automatas",
    joinColumns: [{ name: "test_id" }],
    inverseJoinColumns: [{ name: "automata_id" }],
  })
  automatas: Automata[];

  @Column({ type: "text", default: "public" })
  privacy: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
export { Test };
