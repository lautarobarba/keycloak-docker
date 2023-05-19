import { MigrationInterface, QueryRunner } from "typeorm";

export class addConfirmEmailFieldInUser1667027272128 implements MigrationInterface {
    name = 'addConfirmEmailFieldInUser1667027272128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_email_confirmed"`);
    }

}
