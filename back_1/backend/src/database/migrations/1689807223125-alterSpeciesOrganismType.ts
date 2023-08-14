import { MigrationInterface, QueryRunner } from "typeorm";

export class alterSpeciesOrganismType1689807223125 implements MigrationInterface {
    name = 'alterSpeciesOrganismType1689807223125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."species_organism_type_enum" RENAME TO "species_organism_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."species_organism_type_enum" AS ENUM('TREE', 'BUSH', 'SUBSHRUB', 'FUNGUS', 'GRASS', 'LICHEN', 'HEMIPARASITE_SUBSHRUB')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" TYPE "public"."species_organism_type_enum" USING "organism_type"::"text"::"public"."species_organism_type_enum"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" SET DEFAULT 'TREE'`);
        await queryRunner.query(`DROP TYPE "public"."species_organism_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."species_organism_type_enum_old" AS ENUM('TYPE1', 'TYPE2')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" TYPE "public"."species_organism_type_enum_old" USING "organism_type"::"text"::"public"."species_organism_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "organism_type" SET DEFAULT 'TYPE1'`);
        await queryRunner.query(`DROP TYPE "public"."species_organism_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."species_organism_type_enum_old" RENAME TO "species_organism_type_enum"`);
    }

}
