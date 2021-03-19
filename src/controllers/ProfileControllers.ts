import { Request, Response } from "express";
import profile_Service from "../services/Profile_Service/profile_Service";

export default new class Profile_Controllers{

    async seacher_Profile(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const seacherUser = await profile_Service.seacher_User_Service(token!);
            const [{ id, name_full, username, email, created_at }] = seacherUser;

            const user = {
                id: id,
                name_full: name_full,
                username: username,
                email: email,
                created_at: created_at
            }

            return Response.status(200).json(user);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async seacher_Following(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            
            const dataUser = await profile_Service.seacher_following_Service(token!);
            
            return Response.status(200).json(dataUser);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}