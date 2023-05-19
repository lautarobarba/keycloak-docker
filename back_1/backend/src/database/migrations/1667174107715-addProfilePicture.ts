import { MigrationInterface, QueryRunner } from "typeorm";

export class addProfilePicture1667174107715 implements MigrationInterface {
    name = 'addProfilePicture1667174107715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile_pictures" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "path" character varying(255) NOT NULL, "mimetype" character varying, "original_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "file_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_25de60ffee2a96a072c75d1f7a9" UNIQUE ("file_name"), CONSTRAINT "PK_55851331ec0d252521dd1f7cde2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_picture_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_02ec15de199e79a0c46869895f4" UNIQUE ("profile_picture_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_02ec15de199e79a0c46869895f4" FOREIGN KEY ("profile_picture_id") REFERENCES "profile_pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_02ec15de199e79a0c46869895f4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_02ec15de199e79a0c46869895f4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_picture_id"`);
        await queryRunner.query(`DROP TABLE "profile_pictures"`);
    }

}
