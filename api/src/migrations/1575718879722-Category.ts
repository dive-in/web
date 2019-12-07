import {MigrationInterface, QueryRunner} from "typeorm";

export class Category1575718879722 implements MigrationInterface {
    name = 'Category1575718879722'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "menuId" integer, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_8b427254858a7396b5349685454" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_8b427254858a7396b5349685454"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
    }

}
