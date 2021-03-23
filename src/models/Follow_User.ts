import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("follow_user")
class Follow_User{

    @PrimaryColumn()
    id: string;

    @Column()
    id_user: string;

    @Column()
    id_follower: string

    @CreateDateColumn()
    created_at: Date;
}

export default Follow_User;