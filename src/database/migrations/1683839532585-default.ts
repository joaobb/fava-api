import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683839532585 implements MigrationInterface {
    name = 'default1683839532585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ALTER COLUMN "answerSource" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ALTER COLUMN "answerSource" SET NOT NULL`);
    }

}
