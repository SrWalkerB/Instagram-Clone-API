import { v4 as uuidv4 } from "uuid";
import { getCustomRepository } from "typeorm";
import { ICreateUser } from "./auth_Interfaces";
import UserRepository from "../../repositories/UserRepository";





class Auth_Service{

    async create_Account_Service(data: ICreateUser){

        const userRepository = getCustomRepository(UserRepository);

        const user = userRepository.create({
            name: data.name,
            surname: data.surname,
            email: data.email
        })
    }
}


export default new Auth_Service;