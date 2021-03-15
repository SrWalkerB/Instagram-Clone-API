import { Request, Response } from "express";
import auth_Service from "../services/Auth_Service/auth_Service";

export default new class Auth_Controllers{

    async login_Account(Request: Request, Response: Response){
        try {
            
            const { email, password } = Request.body;

            const result = await auth_Service.login_Account_Service({
                email: email,
                password: password
            })

            if(result.err){
                return Response.status(404).json({ err: result.err });
            }

            return Response.status(200).json({ msg: result.msg });
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async create_Account(Request: Request, Response: Response){
        
        try {
            const { name, surname, email, password } = Request.body;
    
            const save = await auth_Service.create_Account_Service({
                name: name,
                surname: surname,
                email: email,
                password: password
            });

            if(save.err){
                return Response.status(404).json({ err: save.err });
            }
    
            return Response.status(201).json(save.msg);
            
        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }

    async delete_Account(Request: Request, Response: Response){
        try {
            
            const { id } = Request.params;

            const del = await auth_Service.delete_Account_Service(id);

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

