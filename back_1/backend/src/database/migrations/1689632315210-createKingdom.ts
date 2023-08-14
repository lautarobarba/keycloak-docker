import { MigrationInterface, QueryRunner } from "typeorm";

export class createKingdom1689632315210 implements MigrationInterface {
    name = 'createKingdom1689632315210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kingdoms" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "userModId" integer, CONSTRAINT "PK_1c579ab8ed833694f47bf0ab293" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "kingdoms" ADD CONSTRAINT "FK_8ec76d0d0a7498ba983abd45674" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kingdoms" DROP CONSTRAINT "FK_8ec76d0d0a7498ba983abd45674"`);
        await queryRunner.query(`DROP TABLE "kingdoms"`);
    }

}
