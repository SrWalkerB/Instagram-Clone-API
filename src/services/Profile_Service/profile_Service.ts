import jsonwebtoken from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import Follow_User_Repository from "../../repositories/FollowRepository";
import UserRepository from "../../repositories/UserRepository"
import generatedToken from "../../utils/generatedToken";


export default new class Profile_Service{

    async seacher_User_Service(token: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;        
        const userRepository = await getCustomRepository(UserRepository).find({id});

        return userRepository;
    }

    async seacher_following_Service(token: string){

        const decoded = await generatedToken.decoded_token(token);
        const { id } = decoded
        const followRepository = await getCustomRepository(Follow_User_Repository).find({id});
            
        return followRepository
    }
}