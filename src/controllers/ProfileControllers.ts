import { Request, Response } from "express";
import profile_Service from "../services/Profile_Service/profile_Service";

export default new class Profile_Controllers{

    async seacher_Profile(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const seacherUser = await profile_Service.seacher_User_Service_Token(token!);

            return Response.status(200).json(seacherUser);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async seacher_following(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const dataUser = await profile_Service.seacher_following_Service(token!);
            
            return Response.status(200).json(dataUser);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async seacher_UserName(Request: Request, Response: Response){
        try {
            
            const { username } = Request.params;
            const result = await profile_Service.seacher_UserName_Service(username);

            return Response.status(200).json(result);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async follow_user(Request: Request, Response: Response){
        try {
            
            const token = Request.header("token");
            const { id: id_folllower } = Request.params;
            const resp = await profile_Service.follow_user_Service(token!, id_folllower);

            if(resp.err){
                return Response.status(404).json({ err: resp.err });
            }

            if(resp.warning){
                return Response.status(400).json({ err: resp.warning });
            }

            return Response.status(201).json({msg: resp.msg});

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async verify_follow(Request: Request, Response: Response){
        try {
            
            const { id } = Request.params;
            const token = Request.header("token");
            
            const result = await profile_Service.verify_follower_user_Service(token!, id);

            if(result.err){
                return Response.status(404).json({ msg: result.err });
            }

            return Response.status(200).json({ msg: result.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async upload_Photo(Request: Request, Response: Response){
        try {
            
            if(Request.file == undefined){
                return Response.status(400).json({ err: "Format not suported" });
            }

            const token = Request.header("token");
            const { originalname, size, filename  } = Request.file;

            const upload = await profile_Service.upload_Photo_Info({
                original_name: originalname,
                name_hash: filename,
                size: `${size}`,
            }, token!);

            return Response.status(200).json(upload);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async upload_Profile_Photo(Request: Request, Response: Response){
        try {
            
            if(Request.file == undefined) {
                return Response.status(400).json({ err: "Formated not suported" });
            }

            const { filename: name_hash, originalname, size } = Request.file;
            const token = Request.header("token");

            const upload = await profile_Service.upload_Photo_Profile({
                size: `${size}`,
                original_name: originalname,
                name_hash: name_hash
            }, token!);

            return Response.status(200).json(upload.msg);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async unfollow_Service(Request: Request, Response: Response){
        try {
            
            const token = Request.header('token');
            const { id } = Request.params;
            const del = await profile_Service.unfollow_user_Service(id, token!);

            if(del.err){
                return Response.status(404).json({ err: del.err });
            }

            return Response.status(200).json({ msg: del.msg });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}