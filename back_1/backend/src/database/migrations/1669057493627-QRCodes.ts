import { MigrationInterface, QueryRunner } from "typeorm";

export class QRCodes1669057493627 implements MigrationInterface {
    name = 'QRCodes1669057493627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "qr_codes" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "specimen_id" integer, CONSTRAINT "UQ_b705004a2f6f4e3db30cdc6984f" UNIQUE ("title"), CONSTRAINT "PK_4b7aa338e150a878ce9e2c55c5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "qr_codes" ADD CONSTRAINT "FK_7965382b7037feb14fcfa984e4b" FOREIGN KEY ("specimen_id") REFERENCES "specimens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "qr_codes" DROP CONSTRAINT "FK_7965382b7037feb14fcfa984e4b"`);
        await queryRunner.query(`DROP TABLE "qr_codes"`);
    }

}
