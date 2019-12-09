import {MigrationInterface, QueryRunner} from "typeorm";

export class Order1575730255982 implements MigrationInterface {
    name = 'Order1575730255982'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "restaurantTableId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_5bdeb6e581e04be7f3706d304e7" FOREIGN KEY ("restaurantTableId") REFERENCES "restaurant_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_5bdeb6e581e04be7f3706d304e7"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`, undefined);
        await queryRunner.query(`DROP TABLE "order"`, undefined);
    }

}
