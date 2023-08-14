import { MigrationInterface, QueryRunner } from "typeorm";

export class renameUserModColumn1690833056687 implements MigrationInterface {
    name = 'renameUserModColumn1690833056687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kingdoms" DROP CONSTRAINT "FK_8ec76d0d0a7498ba983abd45674"`);
        await queryRunner.query(`ALTER TABLE "phylums" DROP CONSTRAINT "FK_e3e11b777a2fd1e6ce5d11df9d4"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_6ecc8bc46ff86c109589708fc0d"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_719502ea950db4575487b252209"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_515873e4c3c44278d5ac5e728ae"`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "FK_133b7b286a3982c1fe98a2a25be"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" DROP CONSTRAINT "FK_6a2b81504d7b2424c2020446217"`);
        await queryRunner.query(`ALTER TABLE "classes_tax" DROP CONSTRAINT "FK_9dd2b7b5ad482a334d2eff63bed"`);
        await queryRunner.query(`ALTER TABLE "kingdoms" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "phylums" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "specimens" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "species" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "genera" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "families" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "classes_tax" RENAME COLUMN "userModId" TO "user_mod_id"`);
        await queryRunner.query(`ALTER TABLE "kingdoms" ADD CONSTRAINT "FK_30f7ce51ac968ca8d49d1fdd3d9" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phylums" ADD CONSTRAINT "FK_83607df426bf5187309d7999d7c" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_cb5db1af176da204e203085fd50" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_6416762c60ce04ba160a8f0783e" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_e4ce727dc4713358fe6f30018d1" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "FK_5f3632784336b68723fa2637fce" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_tax" ADD CONSTRAINT "FK_1b102ee8019fb9a74a439ee1829" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_tax" ADD CONSTRAINT "FK_bda026a5d93d4549919e6614a8f" FOREIGN KEY ("user_mod_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_tax" DROP CONSTRAINT "FK_bda026a5d93d4549919e6614a8f"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" DROP CONSTRAINT "FK_1b102ee8019fb9a74a439ee1829"`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "FK_5f3632784336b68723fa2637fce"`);
        await queryRunner.query(`ALTER TABLE "genera" DROP CONSTRAINT "FK_e4ce727dc4713358fe6f30018d1"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_6416762c60ce04ba160a8f0783e"`);
        await queryRunner.query(`ALTER TABLE "specimens" DROP CONSTRAINT "FK_cb5db1af176da204e203085fd50"`);
        await queryRunner.query(`ALTER TABLE "phylums" DROP CONSTRAINT "FK_83607df426bf5187309d7999d7c"`);
        await queryRunner.query(`ALTER TABLE "kingdoms" DROP CONSTRAINT "FK_30f7ce51ac968ca8d49d1fdd3d9"`);
        await queryRunner.query(`ALTER TABLE "classes_tax" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "orders_tax" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "families" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "genera" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "species" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "specimens" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "phylums" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "kingdoms" RENAME COLUMN "user_mod_id" TO "userModId"`);
        await queryRunner.query(`ALTER TABLE "classes_tax" ADD CONSTRAINT "FK_9dd2b7b5ad482a334d2eff63bed" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_tax" ADD CONSTRAINT "FK_6a2b81504d7b2424c2020446217" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "FK_133b7b286a3982c1fe98a2a25be" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genera" ADD CONSTRAINT "FK_515873e4c3c44278d5ac5e728ae" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_719502ea950db4575487b252209" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specimens" ADD CONSTRAINT "FK_6ecc8bc46ff86c109589708fc0d" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phylums" ADD CONSTRAINT "FK_e3e11b777a2fd1e6ce5d11df9d4" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "kingdoms" ADD CONSTRAINT "FK_8ec76d0d0a7498ba983abd45674" FOREIGN KEY ("userModId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
