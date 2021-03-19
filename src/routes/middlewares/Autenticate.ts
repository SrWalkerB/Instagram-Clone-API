import { NextFunction, Request, Response } from "express";
import generatedToken from "../../utils/generatedToken";

class Autenticate{

    autenticate(Request: Request, Response: Response, Next: NextFunction){

        const token = Request.header("token");
        const decoded = generatedToken.decoded_token(token!);

        if(decoded.err){
            return Response.status(401).json({ err: decoded.err });
        }

        Next();
    }
}

export default new Autenticate();