import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671661814851 implements MigrationInterface {
    name = 'default1671661814851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" DROP CONSTRAINT "FK_f498278a90424b38dffe2ec6989"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" RENAME COLUMN "test_id" TO "test_submission_id"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ADD CONSTRAINT "FK_d67aaf5807fc1a7d2cf08a704dc" FOREIGN KEY ("test_submission_id") REFERENCES "test_submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" DROP CONSTRAINT "FK_d67aaf5807fc1a7d2cf08a704dc"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" RENAME COLUMN "test_submission_id" TO "test_id"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ADD CONSTRAINT "FK_f498278a90424b38dffe2ec6989" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
