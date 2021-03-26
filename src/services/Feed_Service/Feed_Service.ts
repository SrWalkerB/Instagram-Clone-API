import crypto from "crypto";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { getCustomRepository } from "typeorm";
import Photo_Like_Repository from "../../repositories/Photo_Like_Repository";
import Photo_Users_Repository from "../../repositories/Photo_Users_Repository";
import generatedToken from "../../utils/generatedToken";
import profile_Service from "../Profile_Service/profile_Service";

export default new class Feed_Service{

    async list_feed_Service(token: string){

        let feed: object[] = [];
        moment.locale("pt-br");
        
        const followings = await profile_Service.seacher_following_Service(token);
        const photo_Repository = await getCustomRepository(Photo_Users_Repository);

        for(let x = 0; x < followings.length; x++){

            const data = await photo_Repository.createQueryBuilder("photo_users")
            .where("photo_users.id_user = :id_user", {id_user: followings[x].id_user} )
            .orderBy("photo_users.upload_At", "DESC").getMany();

            const userData = await profile_Service.searcher_User_ID_Service(followings[x].id_user);
            const photo_profile = await getCustomRepository(Photo_Users_Repository).find({ id_user: followings[x].id_user, profile: true }); 
            const photo_like = getCustomRepository(Photo_Like_Repository);

            const [ profilePhotos = "" ] = photo_profile;
            const [{ username }] = userData;
         
            for(let i=0; i < data.length; i++){

                const photo_like_elements = await photo_like.find({ id_photo: data[i].id_photo})
                const data_formated = moment(data[i].upload_At).calendar()

                feed.push({
                    id_photo: data[i].id_photo,
                    username: username,
                    url: data[i].url,
                    photo_like:photo_like_elements,
                    upload_At: data_formated,
                    profilePhotos: profilePhotos,
                })
            } 
        }
        
        function compare(a, b) {
          if(a.upload_At > b.upload_At) {
              return -1;
          }
          if(a.upload_At < b.upload_At) {
              return 1;
          }
          return 0;
        }
        
        feed.sort(compare);

        

        return feed;
    }

    async like_photo_Service(id_photo, token){

        const { id } = generatedToken.decoded_token(token);
        const photo_like_repository = getCustomRepository(Photo_Like_Repository);
        const photo_Repository = await getCustomRepository(Photo_Users_Repository).find({ id_photo: id_photo });
        const verify_like = await photo_like_repository.find({ id_photo: id_photo, id_user: id });

        if(photo_Repository.length == 0){
            return { err: "Photo not found" }
        }

        if(verify_like.length != 0){
            return { err_like: "Have Like" }
        }

        const photo_like = {
            id_like: uuidv4() + crypto.randomBytes(25).toString("hex"),
            id_photo: id_photo,
            id_user: id,
            created_At: new Date()
        }

        await photo_like_repository.save(photo_like)

        return { msg: "like" };
    }
}