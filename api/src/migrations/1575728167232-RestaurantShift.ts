import {MigrationInterface, QueryRunner} from "typeorm";

export class RestaurantShift1575728167232 implements MigrationInterface {
    name = 'RestaurantShift1575728167232'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD "shiftId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant_table" ADD CONSTRAINT "FK_3d5dbd5b614dcf7d2a902c36b47" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP CONSTRAINT "FK_3d5dbd5b614dcf7d2a902c36b47"`, undefined);
        await queryRunner.query(`ALTER TABLE "restaurant_table" DROP COLUMN "shiftId"`, undefined);
    }

}
