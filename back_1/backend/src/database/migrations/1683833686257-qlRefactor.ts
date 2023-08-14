import { MigrationInterface, QueryRunner } from "typeorm";

export class qlRefactor1683833686257 implements MigrationInterface {
    name = 'qlRefactor1683833686257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_85e8689d21a9e7202069204985c"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_410b6c4475ced81d013ce0701ae"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" DROP CONSTRAINT "FK_7965382b7037feb14fcfa984e4b"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" DROP COLUMN "specimen_id"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" ADD "model_class" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "qr_codes" ADD "model_id" integer`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd" FOREIGN KEY ("genus_id") REFERENCES "genera"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_85e8689d21a9e7202069204985c" FOREIGN KEY ("example_img") REFERENCES "pictures"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_410b6c4475ced81d013ce0701ae" FOREIGN KEY ("foliage_img") REFERENCES "pictures"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_410b6c4475ced81d013ce0701ae"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_85e8689d21a9e7202069204985c"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" DROP COLUMN "model_id"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" DROP COLUMN "model_class"`);
        await queryRunner.query(`ALTER TABLE "qr_codes" ADD "specimen_id" integer`);
        await queryRunner.query(`ALTER TABLE "qr_codes" ADD CONSTRAINT "FK_7965382b7037feb14fcfa984e4b" FOREIGN KEY ("specimen_id") REFERENCES "specimens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_410b6c4475ced81d013ce0701ae" FOREIGN KEY ("foliage_img") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_85e8689d21a9e7202069204985c" FOREIGN KEY ("example_img") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd" FOREIGN KEY ("genus_id") REFERENCES "genera"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
