import { MigrationInterface, QueryRunner } from "typeorm";

export class refactorTaxonomy1689806455371 implements MigrationInterface {
    name = 'refactorTaxonomy1689806455371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_85e8689d21a9e7202069204985c"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_410b6c4475ced81d013ce0701ae"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "origin"`);
        await queryRunner.query(`DROP TYPE "public"."species_origin_enum"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "REL_85e8689d21a9e7202069204985"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "example_img"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "REL_410b6c4475ced81d013ce0701a"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "foliage_img"`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD "userModId" integer`);
        await queryRunner.query(`ALTER TABLE "species" ADD "english_name" character varying(255)`);
        await queryRunner.query(`CREATE TYPE "public"."species_organism_type_enum" AS ENUM('TYPE1', 'TYPE2')`);
        await queryRunner.query(`ALTER TABLE "species" ADD "organism_type" "public"."species_organism_type_enum" DEFAULT 'TYPE1'`);
        await queryRunner.query(`CREATE TYPE "public"."species_presence_enum" AS ENUM('PRESENT', 'ABSENT')`);
        await queryRunner.query(`ALTER TABLE "species" ADD "presence" "public"."species_presence_enum" DEFAULT 'PRESENT'`);
        await queryRunner.query(`ALTER TABLE "species" ADD "userModId" integer`);
        await queryRunner.query(`ALTER TABLE "genera" ADD "userModId" integer`);
        await queryRunner.query(`ALTER TABLE "specimens" ALTER COLUMN "species_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "scientific_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "UQ_9058bfca05c3c41650ba1aa03f4"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "common_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "UQ_78d707464a40c75b51f905c695a"`);
        await queryRunner.query(`ALTER TYPE "public"."species_status_enum" RENAME TO "species_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."species_status_enum" AS ENUM('NATIVE', 'ENDEMIC', 'INTRODUCED')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" TYPE "public"."species_status_enum" USING "status"::"text"::"public"."species_status_enum"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" SET DEFAULT 'NATIVE'`);
        await queryRunner.query(`DROP TYPE "public"."species_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."species_foliage_type_enum" RENAME TO "species_foliage_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."species_foliage_type_enum" AS ENUM('PERENNIAL', 'DECIDUOUS')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" TYPE "public"."species_foliage_type_enum" USING "foliage_type"::"text"::"public"."species_foliage_type_enum"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" SET DEFAULT 'DECIDUOUS'`);
        await queryRunner.query(`DROP TYPE "public"."species_foliage_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "genus_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "UQ_abda9bd66d53d5f348840c6782c"`);
        await queryRunner.query(`ALTER TABLE "genera" ALTER COLUMN "family_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_6ecc8bc46ff86c109589708fc0d" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd" FOREIGN KEY ("genus_id") REFERENCES "genera"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_719502ea950db4575487b252209" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_515873e4c3c44278d5ac5e728ae" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_515873e4c3c44278d5ac5e728ae"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_719502ea950db4575487b252209"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_6ecc8bc46ff86c109589708fc0d"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821"`);
        await queryRunner.query(`ALTER TABLE "genera" ALTER COLUMN "family_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "UQ_abda9bd66d53d5f348840c6782c" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "genus_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."species_foliage_type_enum_old" AS ENUM('PERENNE', 'CADUCA')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" TYPE "public"."species_foliage_type_enum_old" USING "foliage_type"::"text"::"public"."species_foliage_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "foliage_type" SET DEFAULT 'PERENNE'`);
        await queryRunner.query(`DROP TYPE "public"."species_foliage_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."species_foliage_type_enum_old" RENAME TO "species_foliage_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."species_status_enum_old" AS ENUM('PRESENT', 'ABSENT', 'EXTINCT')`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" TYPE "public"."species_status_enum_old" USING "status"::"text"::"public"."species_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "status" SET DEFAULT 'PRESENT'`);
        await queryRunner.query(`DROP TYPE "public"."species_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."species_status_enum_old" RENAME TO "species_status_enum"`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "UQ_78d707464a40c75b51f905c695a" UNIQUE ("common_name")`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "common_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "UQ_9058bfca05c3c41650ba1aa03f4" UNIQUE ("scientific_name")`);
        await queryRunner.query(`ALTER TABLE "species" ALTER COLUMN "scientific_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specimens" ALTER COLUMN "species_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genera" DROP COLUMN "userModId"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "userModId"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "presence"`);
        await queryRunner.query(`DROP TYPE "public"."species_presence_enum"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "organism_type"`);
        await queryRunner.query(`DROP TYPE "public"."species_organism_type_enum"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "english_name"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP COLUMN "userModId"`);
        await queryRunner.query(`ALTER TABLE "species" ADD "foliage_img" integer`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "REL_410b6c4475ced81d013ce0701a" UNIQUE ("foliage_img")`);
        await queryRunner.query(`ALTER TABLE "species" ADD "example_img" integer`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "REL_85e8689d21a9e7202069204985" UNIQUE ("example_img")`);
        await queryRunner.query(`CREATE TYPE "public"."species_origin_enum" AS ENUM('NATIVE', 'INTRODUCED')`);
        await queryRunner.query(`ALTER TABLE "species" ADD "origin" "public"."species_origin_enum" DEFAULT 'NATIVE'`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd" FOREIGN KEY ("genus_id") REFERENCES "genera"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_410b6c4475ced81d013ce0701ae" FOREIGN KEY ("foliage_img") REFERENCES "pictures"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_85e8689d21a9e7202069204985c" FOREIGN KEY ("example_img") REFERENCES "pictures"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
