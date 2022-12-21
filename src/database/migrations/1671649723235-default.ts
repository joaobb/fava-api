import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671649723235 implements MigrationInterface {
    name = 'default1671649723235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_e07d497132709affeef715a2b60"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_e07d497132709affeef715a2b60" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_e07d497132709affeef715a2b60"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_e07d497132709affeef715a2b60" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
