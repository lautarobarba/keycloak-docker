import { MigrationInterface, QueryRunner } from "typeorm";

export class createClassAndOrder1689737896307 implements MigrationInterface {
    name = 'createClassAndOrder1689737896307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders_tax" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "class_tax_id" integer NOT NULL, "userModId" integer, CONSTRAINT "PK_5c0074ff8bd4fb65d856b31e9ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "families" ADD "order_tax_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "families" ADD "userModId" integer`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "UQ_083e295fc64ec128618c5e37139"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" ADD CONSTRAINT "FK_dc8995050506668818a73394c97" FOREIGN KEY ("class_tax_id") REFERENCES "classes_tax"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_tax" ADD CONSTRAINT "FK_6a2b81504d7b2424c2020446217" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "FK_dcb231918958759cf8156209c52" FOREIGN KEY ("order_tax_id") REFERENCES "orders_tax"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "FK_133b7b286a3982c1fe98a2a25be" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "FK_133b7b286a3982c1fe98a2a25be"`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "FK_dcb231918958759cf8156209c52"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" DROP CONSTRAINT "FK_6a2b81504d7b2424c2020446217"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" DROP CONSTRAINT "FK_dc8995050506668818a73394c97"`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "UQ_083e295fc64ec128618c5e37139" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "families" DROP COLUMN "userModId"`);
        await queryRunner.query(`ALTER TABLE "families" DROP COLUMN "order_tax_id"`);
        await queryRunner.query(`DROP TABLE "orders_tax"`);
    }

}
