import {MigrationInterface, QueryRunner} from "typeorm";

export class Shift1575722024543 implements MigrationInterface {
    name = 'Shift1575722024543'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "shift" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "shift_employees_employee" ("shiftId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_b01b9777d3a6e3823031ff7fe77" PRIMARY KEY ("shiftId", "employeeId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f7e1f38f7d1d15e91baa38ed24" ON "shift_employees_employee" ("shiftId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c7ac5234a7830bbd17ba235d54" ON "shift_employees_employee" ("employeeId") `, undefined);
        await queryRunner.query(`ALTER TABLE "shift_employees_employee" ADD CONSTRAINT "FK_f7e1f38f7d1d15e91baa38ed24c" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "shift_employees_employee" ADD CONSTRAINT "FK_c7ac5234a7830bbd17ba235d543" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shift_employees_employee" DROP CONSTRAINT "FK_c7ac5234a7830bbd17ba235d543"`, undefined);
        await queryRunner.query(`ALTER TABLE "shift_employees_employee" DROP CONSTRAINT "FK_f7e1f38f7d1d15e91baa38ed24c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c7ac5234a7830bbd17ba235d54"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f7e1f38f7d1d15e91baa38ed24"`, undefined);
        await queryRunner.query(`DROP TABLE "shift_employees_employee"`, undefined);
        await queryRunner.query(`DROP TABLE "shift"`, undefined);
    }

}
