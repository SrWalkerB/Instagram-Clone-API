import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";

const profile_Routes = Router();

profile_Routes.get("/profile", ProfileControllers.seacher_Profile);

profile_Routes.get("/profile/following", ProfileControllers.seacher_Following);


export default profile_Routes;


