import { v4 as uuidv4 } from "uuid";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("follow_user")
class Follow_User{

    @PrimaryColumn()
    id: string;

    @Column()
    id_follower: string;

    @Column()
    id_following: string

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    uudi(){
        this.id = uuidv4();
    }
}

export default Follow_User;