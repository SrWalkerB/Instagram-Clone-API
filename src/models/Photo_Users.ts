import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("photo_users")
class Photo_Users{

    @PrimaryColumn()
    id_photo: string;

    @Column()
    original_name: string

    @Column()
    name_hash: string;

    @Column()
    size: string;

    @Column()
    url: string;

    @CreateDateColumn()
    upload_At: Date;

}

export default Photo_Users;