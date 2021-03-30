import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";

const login_Routes = Router();


login_Routes.post("/auth", AuthControllers.login_Account);

login_Routes.post("/auth/create", AuthControllers.create_Account);


export default login_Routes;