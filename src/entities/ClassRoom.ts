import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("classrooms")
class Classroom extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", unique: true })
  invitationToken: string;

  @ManyToOne(() => User, (mentor) => mentor.id)
  @JoinColumn({
    name: "mentor_id",
  })
  mentor: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: "classroom_enrollees",
    joinColumns: [{ name: "classroom_id" }],
    inverseJoinColumns: [{ name: "enrollee_id" }],
  })
  enrollees: User[];
}

export { Classroom };
