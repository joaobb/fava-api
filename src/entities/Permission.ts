import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("permissions")
class Permission extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;
}

export { Permission };
