import {MigrationInterface, QueryRunner} from "typeorm";

export class Employee1575720521836 implements MigrationInterface {
    name = 'Employee1575720521836'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying NOT NULL, "restaurantId" integer, CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_8992c5e577a456f8f8955544494" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_8992c5e577a456f8f8955544494"`, undefined);
        await queryRunner.query(`DROP TABLE "employee"`, undefined);
    }

}
