import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Automata } from "./Automata";
import { Role } from "./Role";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
class User extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @ManyToOne(() => Role, (role) => role.name)
  role: Role;

  @OneToMany(() => Automata, (automata) => automata.author)
  automatas: Automata[];
}

export { User };
