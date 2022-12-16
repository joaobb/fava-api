import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671159346237 implements MigrationInterface {
    name = 'default1671159346237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "privacy" text NOT NULL DEFAULT 'public', "deletedAt" TIMESTAMP, "author_id" integer, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise_automatas" ("exercise_id" integer NOT NULL, "automata_id" integer NOT NULL, CONSTRAINT "PK_2ce0bfdbf2717bab5f3d6452ef6" PRIMARY KEY ("exercise_id", "automata_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c542f277f53ef7427a960b2b9a" ON "exercise_automatas" ("exercise_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b482000054ec5b4470e458666" ON "exercise_automatas" ("automata_id") `);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_b3c246d76305dd34b814387a61c" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_automatas" ADD CONSTRAINT "FK_c542f277f53ef7427a960b2b9a4" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exercise_automatas" ADD CONSTRAINT "FK_4b482000054ec5b4470e4586662" FOREIGN KEY ("automata_id") REFERENCES "automatas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_automatas" DROP CONSTRAINT "FK_4b482000054ec5b4470e4586662"`);
        await queryRunner.query(`ALTER TABLE "exercise_automatas" DROP CONSTRAINT "FK_c542f277f53ef7427a960b2b9a4"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_b3c246d76305dd34b814387a61c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b482000054ec5b4470e458666"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c542f277f53ef7427a960b2b9a"`);
        await queryRunner.query(`DROP TABLE "exercise_automatas"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
    }

}
