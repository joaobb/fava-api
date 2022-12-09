import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Automata } from "./Automata";
import { Role } from "./Role";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";

@Entity("users")
class User extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "user_permissions",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];

  @OneToMany(() => Automata, (automata) => automata.author)
  automatas: Automata[];
}

export { User };
