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
}