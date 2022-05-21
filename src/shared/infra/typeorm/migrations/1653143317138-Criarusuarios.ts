import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Criarusuarios1653143317138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: "users",
            columns: [
            {
              name: "id",
              type: "uuid"
            },
            {
              name: "nome",
              type: "varchar"
            },
            {
              name: "email",
              type: "varchar",
              isUnique: true
            },
            {
              name: "telefone",
              type: "numeric"
            },
            {
              name: "cargo",
              type: "varchar"
            },
            {
              name: "empresa",
              type: "varchar"
            },
            {
              name: "foto",
              type: "varchar",
              isNullable: true,
            }, 
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            }
          ],
        })
      );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
