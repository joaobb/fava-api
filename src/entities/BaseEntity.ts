import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}

export { BaseEntity };
