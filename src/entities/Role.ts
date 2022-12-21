import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Permission } from "./Permission";

@Entity("roles")
class Role {
  @PrimaryColumn({
    type: "numeric",
    default: 1,
  })
  id!: number;

  @Column({ type: "text", unique: true })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permission_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Role };
