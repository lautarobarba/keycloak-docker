import { MigrationInterface, QueryRunner } from "typeorm";

export class createPhylumAndClassTax1689725161124 implements MigrationInterface {
    name = 'createPhylumAndClassTax1689725161124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phylums" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "kingdom_id" integer NOT NULL, "userModId" integer, CONSTRAINT "PK_e47c740d6c00636ca9bc122ec86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_tax" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "phylum_id" integer NOT NULL, "userModId" integer, CONSTRAINT "PK_e0c546ed1c8d3393681b80d53c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phylums" ADD CONSTRAINT "FK_76aa1dcaa1e9d9ab9a39186e629" FOREIGN KEY ("kingdom_id") REFERENCES "kingdoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phylums" ADD CONSTRAINT "FK_e3e11b777a2fd1e6ce5d11df9d4" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_tax" ADD CONSTRAINT "FK_725dea7ca565504c196c94d290f" FOREIGN KEY ("phylum_id") REFERENCES "phylums"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_tax" ADD CONSTRAINT "FK_9dd2b7b5ad482a334d2eff63bed" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_tax" DROP CONSTRAINT "FK_9dd2b7b5ad482a334d2eff63bed"`);
        await queryRunner.query(`ALTER TABLE "classes_tax" DROP CONSTRAINT "FK_725dea7ca565504c196c94d290f"`);
        await queryRunner.query(`ALTER TABLE "phylums" DROP CONSTRAINT "FK_e3e11b777a2fd1e6ce5d11df9d4"`);
        await queryRunner.query(`ALTER TABLE "phylums" DROP CONSTRAINT "FK_76aa1dcaa1e9d9ab9a39186e629"`);
        await queryRunner.query(`DROP TABLE "classes_tax"`);
        await queryRunner.query(`DROP TABLE "phylums"`);
    }

}
