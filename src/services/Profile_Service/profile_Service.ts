import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getCustomRepository, ILike } from "typeorm"
import Follow_User_Repository from "../../repositories/FollowRepository";
import UserRepository from "../../repositories/UserRepository"
import generatedToken from "../../utils/generatedToken";
import IUploadImage from "./profile_Interfaces";
import Photo_Users_Repository from "../../repositories/Photo_Users_Repository";


export default new class Profile_Service{

    async seacher_User_Service_Token(token: string){

        const decoded = generatedToken.decoded_token(token);
        const { id } = decoded;        
        const userRepository = await getCustomRepository(UserRepository).find({id});
        const followRepository = await getCustomRepository(Follow_User_Repository).find({id_follower: id});
        const photo_users = await getCustomRepository(Photo_Users_Repository).find({ id_user: id });

        const [{ name_full, username, email, created_at }] = userRepository;

            const user = {
                id: id,
                name_full: name_full,
                username: username,
                email: email,
                created_at: created_at,
                following: followRepository,
                photo_users: photo_users
            }

        return user;
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

        const result = await follow_repository.find({ id_user: id_following, id_follower: id})

        if(result.length == 0){
            return {msg: false};
        }

        return { msg: true };

    }

    async upload_Photo_Info(data: IUploadImage, token: string){

        const { id } = generatedToken.decoded_token(token);
        const photo_user_Repository =  await getCustomRepository(Photo_Users_Repository);

        const upload = {
            id_photo: uuidv4() + crypto.randomBytes(25).toString("hex"),
            id_user: id,
            profile: false,
            original_name: data.original_name,
            name_hash: data.name_hash,
            size: data.size,
            url: `${process.env.HOST}/files/${data.name_hash}`
        }

        await photo_user_Repository.save(upload);

        return upload;
    }

}