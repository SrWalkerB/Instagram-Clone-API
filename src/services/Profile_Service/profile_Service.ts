import jsonwebtoken from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import UserRepository from "../../repositories/UserRepository"
import generatedToken from "../../utils/generatedToken";


export default new class Profile_Service{

    async seacher_User_Service(token: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;
        const userRepository = await getCustomRepository(UserRepository).find({id});

        return userRepository;
    }
}