import {MigrationInterface, QueryRunner} from "typeorm";

export class Menu1575554705545 implements MigrationInterface {
    name = 'Menu1575554705545'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "menuId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_d8dc3269a0929364fae6a6b73b9" UNIQUE ("menuId")`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_d8dc3269a0929364fae6a6b73b9" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_d8dc3269a0929364fae6a6b73b9"`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_d8dc3269a0929364fae6a6b73b9"`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "menuId"`, undefined);
        await queryRunner.query(`DROP TABLE "menu"`, undefined);
    }

}
