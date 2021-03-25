import moment from "moment";
import { getCustomRepository } from "typeorm";
import Follow_User_Repository from "../../repositories/FollowRepository";
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
            const [{ username }] = userData;
         
            for(let i=0; i < data.length; i++){

                feed.push({
                    id_photo: data[i].id_photo,
                    username: username,
                    url: data[i].url,
                    upload_At: moment(data[i].upload_At).calendar()
                })
            } 
        }
        
        function compare(a,b) {
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
}