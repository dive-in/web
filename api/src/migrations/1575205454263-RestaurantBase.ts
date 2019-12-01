import {MigrationInterface, QueryRunner} from "typeorm";

export class RestaurantBase1575205454263 implements MigrationInterface {
    name = 'RestaurantBase1575205454263'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "restaurant_table" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "restaurantId" integer, CONSTRAINT "PK_3e32a2ab3947c142effeb972a63" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "logoUrl" character varying, CONSTRAINT "UQ_9315499c5bf5ead89fbb877a0b5" UNIQUE ("name"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD CONSTRAINT "FK_263f26ff823cdb9cac2ae508ab6" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP CONSTRAINT "FK_263f26ff823cdb9cac2ae508ab6"`, undefined);
        await queryRunner.query(`DROP TABLE "restaurant"`, undefined);
        await queryRunner.query(`DROP TABLE "restaurant_table"`, undefined);
    }

}
