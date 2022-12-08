import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./Permission";
import { BaseEntity } from "./BaseEntity";

@Entity("roles")
class Role extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permission_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];
}

export { Role };
