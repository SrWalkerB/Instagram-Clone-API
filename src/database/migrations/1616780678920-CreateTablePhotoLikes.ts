import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePhotoLikes1616780678920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "photo_likes",
            columns: [
                {
                    name: "id_like",
                    isPrimary: true,
                    isUnique: true,
                    type: "varchar"
                },
                {
                    name: "id_photo",
                    type: "varchar"
                },
                {
                    name: "id_user",
                    type: "varchar"
                },
                {
                    name: "created_At",
                    type: "timestamp"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("photo_likes");
    }

}
