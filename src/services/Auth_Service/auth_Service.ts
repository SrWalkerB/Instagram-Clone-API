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
            return { err: "User not Found" }
        }

        const token = generatedToken.generated_Token(id); 
        return { msg: token }
    }

    async create_Account_Service(data: ICreateUser){

        const email = data.email;
        const username = data.username;
        const userRepository = getCustomRepository(UserRepository);
        const seacher_Mail = await userRepository.find({email});
        const seacher_Username = await userRepository.find({username});

        if(seacher_Username.length != 0){
            return { err: "Username already created"};
        }

        if(seacher_Mail.length != 0){
            return { err: "Email already created"};
        }
            
        const user = userRepository.create({
            name_full: data.name_full,
            email: data.email,
            username: data.username,
            password: data.password
        })

        await userRepository.save(user);
        return { msg: user };
    }
}

export default new Auth_Service;