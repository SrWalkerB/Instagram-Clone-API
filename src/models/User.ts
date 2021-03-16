import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

@Entity("users")
class Users{

    @PrimaryColumn()
    id: string;

    @Column()
    name_full: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string

    @CreateDateColumn()
    atualized_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 12);
    }

    @BeforeInsert()
    @BeforeUpdate()
    uuid(){
        this.id = uuidv4();
    }

    @BeforeInsert()
    @BeforeUpdate()
    atualized_Date_Create(){
        this.atualized_at = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    created_At_Date(){
        this.created_at = new Date();
    }

}

export default Users;