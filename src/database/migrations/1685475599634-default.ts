import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685475599634 implements MigrationInterface {
    name = 'default1685475599634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" numeric NOT NULL DEFAULT '1', "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "automatas" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "source" text NOT NULL, "privacy" text NOT NULL DEFAULT 'public', "deletedAt" TIMESTAMP, "author_id" integer, CONSTRAINT "PK_241fd93d1a1e8aae308753ea3ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "privacy" text NOT NULL DEFAULT 'public', "deletedAt" TIMESTAMP, "author_id" integer, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_submissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "grade" numeric NOT NULL, "authorReviewed" boolean NOT NULL, "test_id" integer, "taker_id" integer, CONSTRAINT "PK_e05ffc282586eb005bdbe62084b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tests_questions_answers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "answerSource" text, "correct" boolean NOT NULL, "test_submission_id" integer, "automata_id" integer, CONSTRAINT "PK_ae46b521f74bcdccc2f5a697638" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles" ("user_id" integer NOT NULL, "role_id" numeric NOT NULL, CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "test_automatas" ("test_id" integer NOT NULL, "automata_id" integer NOT NULL, CONSTRAINT "PK_ff4d78bf2b52b98656c5dafa7c0" PRIMARY KEY ("test_id", "automata_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21eb4db0731f0fead18fca57cf" ON "test_automatas" ("test_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0305a041ba712491b360a5fd3" ON "test_automatas" ("automata_id") `);
        await queryRunner.query(`ALTER TABLE "automatas" ADD CONSTRAINT "FK_99de2165c8a5443d492d3ced2a5" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_2641af389e482eca919e5dc65da" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_submissions" ADD CONSTRAINT "FK_983b7d564ea222e873cb9aeb88d" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_submissions" ADD CONSTRAINT "FK_badb2725db597eb115fce59392c" FOREIGN KEY ("taker_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ADD CONSTRAINT "FK_d67aaf5807fc1a7d2cf08a704dc" FOREIGN KEY ("test_submission_id") REFERENCES "test_submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" ADD CONSTRAINT "FK_a9195c4efb3e144c114c71f10d8" FOREIGN KEY ("automata_id") REFERENCES "automatas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "test_automatas" ADD CONSTRAINT "FK_21eb4db0731f0fead18fca57cf1" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "test_automatas" ADD CONSTRAINT "FK_f0305a041ba712491b360a5fd33" FOREIGN KEY ("automata_id") REFERENCES "automatas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_automatas" DROP CONSTRAINT "FK_f0305a041ba712491b360a5fd33"`);
        await queryRunner.query(`ALTER TABLE "test_automatas" DROP CONSTRAINT "FK_21eb4db0731f0fead18fca57cf1"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" DROP CONSTRAINT "FK_a9195c4efb3e144c114c71f10d8"`);
        await queryRunner.query(`ALTER TABLE "tests_questions_answers" DROP CONSTRAINT "FK_d67aaf5807fc1a7d2cf08a704dc"`);
        await queryRunner.query(`ALTER TABLE "test_submissions" DROP CONSTRAINT "FK_badb2725db597eb115fce59392c"`);
        await queryRunner.query(`ALTER TABLE "test_submissions" DROP CONSTRAINT "FK_983b7d564ea222e873cb9aeb88d"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_2641af389e482eca919e5dc65da"`);
        await queryRunner.query(`ALTER TABLE "automatas" DROP CONSTRAINT "FK_99de2165c8a5443d492d3ced2a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0305a041ba712491b360a5fd3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21eb4db0731f0fead18fca57cf"`);
        await queryRunner.query(`DROP TABLE "test_automatas"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cf664021f00b9cc1ff95e17de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4435209df12bc1f001e536017"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP TABLE "tests_questions_answers"`);
        await queryRunner.query(`DROP TABLE "test_submissions"`);
        await queryRunner.query(`DROP TABLE "tests"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "automatas"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
