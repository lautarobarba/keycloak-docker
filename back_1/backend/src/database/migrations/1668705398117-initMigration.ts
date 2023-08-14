import { MigrationInterface, QueryRunner } from "typeorm";

export class initMigration1668705398117 implements MigrationInterface {
    name = 'initMigration1668705398117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "refresh_token" character varying(255), "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "profile_picture_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_02ec15de199e79a0c46869895f" UNIQUE ("profile_picture_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pictures" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "path" character varying(255) NOT NULL, "mimetype" character varying, "original_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "file_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_5aed472d03429506a84f43af95e" UNIQUE ("file_name"), CONSTRAINT "PK_7aa5e10dd31983e9f05b9f1fc85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."species_status_enum" AS ENUM('PRESENT', 'ABSENT', 'EXTINCT')`);
        await queryRunner.query(`CREATE TYPE "public"."species_origin_enum" AS ENUM('NATIVE', 'INTRODUCED')`);
        await queryRunner.query(`CREATE TYPE "public"."species_foliage_type_enum" AS ENUM('PERENNE')`);
        await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "scientific_name" character varying(255) NOT NULL, "common_name" character varying(255) NOT NULL, "description" text, "status" "public"."species_status_enum" DEFAULT 'PRESENT', "origin" "public"."species_origin_enum" DEFAULT 'NATIVE', "foliage_type" "public"."species_foliage_type_enum" DEFAULT 'PERENNE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "genus_id" integer, "example_img" integer, "foliage_img" integer, CONSTRAINT "UQ_9058bfca05c3c41650ba1aa03f4" UNIQUE ("scientific_name"), CONSTRAINT "UQ_78d707464a40c75b51f905c695a" UNIQUE ("common_name"), CONSTRAINT "REL_85e8689d21a9e7202069204985" UNIQUE ("example_img"), CONSTRAINT "REL_410b6c4475ced81d013ce0701a" UNIQUE ("foliage_img"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genera" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "family_id" integer, CONSTRAINT "UQ_abda9bd66d53d5f348840c6782c" UNIQUE ("name"), CONSTRAINT "PK_50b2676d5cd7908032d9dd61339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "families" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_083e295fc64ec128618c5e37139" UNIQUE ("name"), CONSTRAINT "PK_70414ac0c8f45664cf71324b9bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specimens" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "coord_lat" character varying, "coord_lon" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "species_id" integer, CONSTRAINT "UQ_254f7f7bdaf99de6d41357a974c" UNIQUE ("name"), CONSTRAINT "PK_b08e6d804ef965346d0f4ca1f68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_02ec15de199e79a0c46869895f4" FOREIGN KEY ("profile_picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd" FOREIGN KEY ("genus_id") REFERENCES "genera"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_85e8689d21a9e7202069204985c" FOREIGN KEY ("example_img") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_410b6c4475ced81d013ce0701ae" FOREIGN KEY ("foliage_img") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_7a4eefc595ca009d4ea5968e821"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_327745e62b7bd9bc475f2ee37e8"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_410b6c4475ced81d013ce0701ae"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_85e8689d21a9e7202069204985c"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6a3e0e686d5625250af46a3d2cd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_02ec15de199e79a0c46869895f4"`);
        await queryRunner.query(`DROP TABLE "specimens"`);
        await queryRunner.query(`DROP TABLE "families"`);
        await queryRunner.query(`DROP TABLE "genera"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TYPE "public"."species_foliage_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."species_origin_enum"`);
        await queryRunner.query(`DROP TYPE "public"."species_status_enum"`);
        await queryRunner.query(`DROP TABLE "pictures"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    }

}
