import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";

const login_Routes = Router();


login_Routes.post("/auth", AuthControllers.create_Account);

login_Routes.delete("/auth/:id", AuthControllers.delete_Account);


export default login_Routes;