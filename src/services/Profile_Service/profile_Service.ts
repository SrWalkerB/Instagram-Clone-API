import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getCustomRepository, ILike } from "typeorm"
import Follow_User_Repository from "../../repositories/FollowRepository";
import UserRepository from "../../repositories/UserRepository"
import generatedToken from "../../utils/generatedToken";


export default new class Profile_Service{

    async seacher_User_Service_Token(token: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;        
        const userRepository = await getCustomRepository(UserRepository).find({id});

        return userRepository;
    }

    async seacher_following_Service(token: string){

        const decoded = await generatedToken.decoded_token(token);
        const { id } = decoded
        const followRepository = await getCustomRepository(Follow_User_Repository).find({id_follower: id});
        
        return followRepository
    }

    async seacher_UserName_Service(username: string) {
    
        const userRepository = await getCustomRepository(UserRepository)
        .find({username: ILike(`${username}%`)});

        return userRepository;
    }

    async secher_Username_Exact_Service(username: string){

        const userRepository = await getCustomRepository(UserRepository).find({username});

        if(userRepository.length == 0){
            return { err: "Not Found" }
        }

        return {msg: userRepository};
    }

    async follow_user_Service(token: string, id_follow: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;

        const follow_repository = await getCustomRepository(Follow_User_Repository);
        const userData = await getCustomRepository(UserRepository).findOne({ id }); //Seguidor
        const userFollowData = await getCustomRepository(UserRepository).findOne({ id: id_follow }); //Segue
        const verify_Follow = await follow_repository.findOne({ id_user: userFollowData?.id, id_follower: id });
        
        if(!userFollowData || !userData){
            return { err: "User not found" }
        }
        
        if(verify_Follow){
            return { warning: "already follow" }
        }
        
        const generated = (bytes: number) => crypto.randomBytes(bytes).toString('hex');

        const data = {
            id: uuidv4() + generated(25),
            id_user: userFollowData.id,
            id_follower: id,
            created_at: new Date()
        }

        await follow_repository.save(data);

        return { msg: "Following"};
    }

    async verify_follower_user_Service(token: string, id_following: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;
        const userRepository = getCustomRepository(UserRepository);
        const follow_repository = getCustomRepository(Follow_User_Repository);
        
        const userData = await userRepository.findOne(id); //Seguidor
        const user_following = await userRepository.findOne({ id: id_following }); //Segue
 
        if(!userData || !user_following){
            return { err: "User not found" };
        }

        const result = await follow_repository.findOne({ id_user: id_following, id_follower: id})

        if(!result){
            return {msg: false};
        }

        return { msg: true };

    }

}