import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePhotos1616596314038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "photo_users",
            columns: [
                {
                    name: 'id_photo',
                    type: "varchar",
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: "original_name",
                    type: "varchar"
                },
                {
                    name: "name_hash",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "size",
                    type: "varchar",
                },
                {
                    name: "url",
                    type: "varchar"
                },
                {
                    name: "upload_At",
                    type: "timestamp",
                    default: "now()"
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("photo_users")
    }

}
