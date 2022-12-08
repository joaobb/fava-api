import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670379227984 implements MigrationInterface {
    name = 'default1670379227984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_roles" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_0a8c5ef722edb01ee0d27acdf08" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e07d497132709affeef715a2b6" ON "permission_roles" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9173e2102ae416a0d07b0c574f" ON "permission_roles" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_e07d497132709affeef715a2b60" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_9173e2102ae416a0d07b0c574fc" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_9173e2102ae416a0d07b0c574fc"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_e07d497132709affeef715a2b60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9173e2102ae416a0d07b0c574f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e07d497132709affeef715a2b6"`);
        await queryRunner.query(`DROP TABLE "permission_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
