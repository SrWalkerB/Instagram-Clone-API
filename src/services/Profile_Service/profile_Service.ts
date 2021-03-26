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
        const follow = await getCustomRepository(Follow_User_Repository).find({id_user: id});
        const photo_users = await getCustomRepository(Photo_Users_Repository).find({ id_user: id });
        const photo_profile = await getCustomRepository(Photo_Users_Repository).find({ id_user: id, profile: true });

        const [{ name_full, username, email, created_at }] = userRepository;
        const [ data = "", ] = photo_profile;
        
        const user = {
            id: id,
            name_full: name_full,
            username: username,
            email: email,
            created_at: created_at,
            following: followRepository,
            follow: follow,
            photo_profile: {
                data: data
            },
            photo_users: photo_users,
        }

        return user;
    }

    async searcher_User_ID_Service(id: string){

        return await getCustomRepository(UserRepository).find({id});
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
        let id_user;

        if(userRepository != undefined){

            [{ id: id_user }] = userRepository;
        }
        const following_user = await getCustomRepository(Follow_User_Repository).find({  id_follower: id_user });
        const photo_user = await getCustomRepository(Photo_Users_Repository).find({ id_user: id_user });
        const followers = await getCustomRepository(Follow_User_Repository).find({id_user: id_user});
        const photo_profile = await getCustomRepository(Photo_Users_Repository).find({ id_user: id_user, profile: true });

        const [ dataProfile = "", ] = photo_profile;
        
        const data = userRepository.map(result => {
            return {
                id: result.id,
                name_full: result.name_full,
                username: result.username,
                following_user: following_user,
                photo_user: photo_user,
                followers: followers,
                dataProfile: dataProfile
            }
        })

        return data;
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

    async unfollow_user_Service(id_delete: string, token: string){

        const { id } = generatedToken.decoded_token(token);
        const verify_follow = await this.verify_follower_user_Service(token, id_delete);
        const follow_repository = getCustomRepository(Follow_User_Repository);

        if(!verify_follow.msg){
            return { err: "User not found" }
        }

        const userInfo = await follow_repository.find({ id_user: id_delete, id_follower: id })        
        await follow_repository.remove(userInfo);

        return { msg: "unfollow" };
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

    async upload_Photo_Profile(data: IUploadImage, token){

        const { id } = generatedToken.decoded_token(token); 
        const photo_Repository = getCustomRepository(Photo_Users_Repository);
        const exPhoto_Profile = await photo_Repository.findOne({ id_user: id, profile: true });

        if(!exPhoto_Profile){

            const insert_Profile_Update = {
                id_photo: uuidv4() + crypto.randomBytes(25).toString("hex"),
                id_user: id,
                profile: true,
                original_name: data.original_name,
                name_hash: data.name_hash,
                size: data.size,
                url: `${process.env.HOST}/files/${data.name_hash}`
            }

            await photo_Repository.save(insert_Profile_Update);
        }

        if(exPhoto_Profile){

            exPhoto_Profile.profile = false;
            await photo_Repository.save(exPhoto_Profile);
            
            //Criando uma nova foto
            const insert_Profile_Update = {
                id_photo: uuidv4() + crypto.randomBytes(25).toString("hex"),
                id_user: id,
                profile: true,
                original_name: data.original_name,
                name_hash: data.name_hash,
                size: data.size,
                url: `${process.env.HOST}/files/${data.name_hash}`
            }

            await photo_Repository.save(insert_Profile_Update);
            
        }

        return { msg: 'update' };
    }
}