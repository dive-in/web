import {MigrationInterface, QueryRunner} from "typeorm";

export class Shift1575727881770 implements MigrationInterface {
    name = 'Shift1575727881770'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "shift" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "employeeId" integer, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "shift" ADD CONSTRAINT "FK_9caafd788eb4cec0a17485e3023" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shift" DROP CONSTRAINT "FK_9caafd788eb4cec0a17485e3023"`, undefined);
        await queryRunner.query(`DROP TABLE "shift"`, undefined);
    }

}
