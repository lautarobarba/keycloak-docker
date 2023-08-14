import { MigrationInterface, QueryRunner } from "typeorm";

export class alterFollageType1686808017607 implements MigrationInterface {
    name = 'alterFollageType1686808017607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."species_foliage_type_enum" RENAME TO "species_foliage_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."species_foliage_type_enum" AS ENUM('PERENNE', 'CADUCA')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" TYPE "public"."species_foliage_type_enum" USING "foliage_type"::"text"::"public"."species_foliage_type_enum"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" SET DEFAULT 'PERENNE'`);
        await queryRunner.query(`DROP TYPE "public"."species_foliage_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."species_foliage_type_enum_old" AS ENUM('PERENNE')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" TYPE "public"."species_foliage_type_enum_old" USING "foliage_type"::"text"::"public"."species_foliage_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" SET DEFAULT 'PERENNE'`);
        await queryRunner.query(`DROP TYPE "public"."species_foliage_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."species_foliage_type_enum_old" RENAME TO "species_foliage_type_enum"`);
    }

}
