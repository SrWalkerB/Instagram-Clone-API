import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";
import autenticate from "./middlewares/autenticate";

const profile_Routes = Router();

profile_Routes.get("/profile", autenticate.autenticate, ProfileControllers.seacher_Profile);

profile_Routes.get("/profile/following", autenticate.autenticate, ProfileControllers.seacher_Following);


export default profile_Routes;


