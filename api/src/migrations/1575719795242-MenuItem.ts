import {MigrationInterface, QueryRunner} from "typeorm";

export class MenuItem1575719795242 implements MigrationInterface {
    name = 'MenuItem1575719795242'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "menu_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "quantityType" character varying(15) NOT NULL, "photo" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`, undefined);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_4af7d3076242d526641d4443d79" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_4af7d3076242d526641d4443d79"`, undefined);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`, undefined);
        await queryRunner.query(`DROP TABLE "menu_item"`, undefined);
    }

}
