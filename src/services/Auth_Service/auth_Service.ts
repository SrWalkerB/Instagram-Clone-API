import { v4 as uuidv4 } from "uuid";
import { getCustomRepository } from "typeorm";
import { ICreateUser } from "./auth_Interfaces";
import UserRepository from "../../repositories/UserRepository";

class Auth_Service{

    async create_Account_Service(data: ICreateUser){

        const email = data.email;
        const userRepository = getCustomRepository(UserRepository);
        const seacher_Mail = await userRepository.find({email});

        if(seacher_Mail.length != 0){
            return { err: "User already created"};
        }

        const user = userRepository.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password
        })

        await userRepository.save(user);

        return { msg: user };
    }

    async delete_Account_Service(id: string){

        const userRepository = getCustomRepository(UserRepository);
        const seacher_ID = await userRepository.find({id});

        if(seacher_ID.length == 0){
            return { err: "User Not Found" };
        }

        await userRepository.delete({id: id});
        return { msg: "User Deletado" };
    }
}

export default new Auth_Service;