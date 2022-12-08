import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670380661433 implements MigrationInterface {
    name = 'default1670380661433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "automatas" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "automatas" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "automatas" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "automatas" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "automatas" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "automatas" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "automatas" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "automatas" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "createdAt"`);
    }

}
