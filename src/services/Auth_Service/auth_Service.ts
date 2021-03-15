import bcrypt from 'bcrypt';
import { getCustomRepository } from "typeorm";
import { ICreateUser, ILoginUser } from "./auth_Interfaces";
import UserRepository from "../../repositories/UserRepository";
import generatedToken from '../../utils/generatedToken';

class Auth_Service{

    async login_Account_Service(data: ILoginUser){

        const email = data.email;
        const userRepository = await getCustomRepository(UserRepository).find({email});

        if(userRepository.length == 0){
            return { err: "User not found" };
        }

        const [{ id, password }] = userRepository;
        const verificaPassword = bcrypt.compareSync(data.password, password);

        if(!verificaPassword){
            return { err: "User not found" };
        }

        const token = generatedToken.generated_Token(id);
        return { msg: token }
    }

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