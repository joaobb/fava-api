import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("roles")
class Role {
  @PrimaryColumn({
    type: "numeric",
    default: 1,
  })
  id!: number;

  @Column({ type: "text", unique: true })
  name: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Role };
