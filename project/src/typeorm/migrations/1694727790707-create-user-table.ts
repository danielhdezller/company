import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1694727790707 implements MigrationInterface {
  name = 'CreateUserTable1694727790707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_tshirtsize_enum" AS ENUM('L', 'XL', 'XXL')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_department_enum" AS ENUM('TECH', 'QA')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_roles_enum" AS ENUM('DEVELOPER', 'TESTER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(64) NOT NULL, "phone" character varying(20) NOT NULL, "hashedPassword" character varying(500) NOT NULL, "tShirtSize" "public"."user_tshirtsize_enum" NOT NULL, "department" "public"."user_department_enum" NOT NULL, "roles" "public"."user_roles_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_department_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_tshirtsize_enum"`);
  }
}
