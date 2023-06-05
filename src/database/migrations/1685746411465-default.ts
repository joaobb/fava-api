import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685746411465 implements MigrationInterface {
    name = 'default1685746411465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" ADD "classroom_id" integer`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_ac4fb011c1ac16f526d33fbda41" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_ac4fb011c1ac16f526d33fbda41"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP COLUMN "classroom_id"`);
    }

}
