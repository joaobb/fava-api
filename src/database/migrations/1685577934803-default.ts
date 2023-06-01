import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685577934803 implements MigrationInterface {
    name = 'default1685577934803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classrooms" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "invitationToken" text NOT NULL, "mentor_id" integer, CONSTRAINT "UQ_5f258782a1c46244d3adfd4724e" UNIQUE ("invitationToken"), CONSTRAINT "PK_20b7b82896c06eda27548bd0c24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom_enrollees" ("classroom_id" integer NOT NULL, "enrollee_id" integer NOT NULL, CONSTRAINT "PK_ee15727aad1a54ae60160f70d08" PRIMARY KEY ("classroom_id", "enrollee_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f579345c7cff1423fd523e3958" ON "classroom_enrollees" ("classroom_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_db9e5e263321d75c96e86b559e" ON "classroom_enrollees" ("enrollee_id") `);
        await queryRunner.query(`ALTER TABLE "classrooms" ADD CONSTRAINT "FK_e7c34ace1e2f24933e588edd955" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom_enrollees" ADD CONSTRAINT "FK_f579345c7cff1423fd523e3958f" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classroom_enrollees" ADD CONSTRAINT "FK_db9e5e263321d75c96e86b559e1" FOREIGN KEY ("enrollee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom_enrollees" DROP CONSTRAINT "FK_db9e5e263321d75c96e86b559e1"`);
        await queryRunner.query(`ALTER TABLE "classroom_enrollees" DROP CONSTRAINT "FK_f579345c7cff1423fd523e3958f"`);
        await queryRunner.query(`ALTER TABLE "classrooms" DROP CONSTRAINT "FK_e7c34ace1e2f24933e588edd955"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db9e5e263321d75c96e86b559e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f579345c7cff1423fd523e3958"`);
        await queryRunner.query(`DROP TABLE "classroom_enrollees"`);
        await queryRunner.query(`DROP TABLE "classrooms"`);
    }

}
