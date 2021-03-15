import { Router } from "express";

const login_Routes = Router();

login_Routes.get("/", (Request, Response) => {

    return Response.status(200).json({ msg: "Hello World" });
})


export default login_Routes;