import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderItem1575729450727 implements MigrationInterface {
    name = 'OrderItem1575729450727'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "menuItemId" integer, CONSTRAINT "REL_caa901372ba1b5aa30d1950b45" UNIQUE ("menuItemId"), CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_caa901372ba1b5aa30d1950b458" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_caa901372ba1b5aa30d1950b458"`, undefined);
        await queryRunner.query(`DROP TABLE "order_item"`, undefined);
    }

}
