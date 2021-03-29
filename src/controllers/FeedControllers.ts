import { Request, Response } from "express";
import Feed_Service from "../services/Feed_Service/Feed_Service";

export default new class Feed_Controllers{

    async list_feed(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const feed = await Feed_Service.list_feed_Service(token!);

            return Response.status(200).json(feed);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async like_photo(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const { id } = Request.params;

            const like = await Feed_Service.like_photo_Service(id, token);

            if(like.err){
                return Response.status(404).json({ err: like.err });
            }

            if(like.err_like){
                return Response.status(400).json({ err: like.err_like });
            }

            return Response.status(200).json({ msg: like.msg })

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async verify_like_photo(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const { id } = Request.params;

            const searcher = await Feed_Service.verify_Like_Photo_Service(id, token);
        

            return Response.status(200).json({ msg: searcher });
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}