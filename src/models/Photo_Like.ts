import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("photo_likes")
class Photo_Like{

    @PrimaryColumn()
    id_like: string;

    @Column()
    id_photo: string;

    @Column()
    id_user: string;

    @CreateDateColumn()
    created_At: string
}

export default Photo_Like;