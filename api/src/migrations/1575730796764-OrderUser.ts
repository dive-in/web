import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderUser1575730796764 implements MigrationInterface {
    name = 'OrderUser1575730796764'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`, undefined);
    }

}
