import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";
import Autenticate from "./middlewares/Autenticate";

const profile_Routes = Router();

profile_Routes.get("/profile", Autenticate.autenticate, ProfileControllers.seacher_Profile);

profile_Routes.get("/profile/following", Autenticate.autenticate, ProfileControllers.seacher_following);

profile_Routes.get("/profile/:username", Autenticate.autenticate, ProfileControllers.seacher_UserName);

profile_Routes.get("/profile/exact/:username", Autenticate.autenticate, ProfileControllers.seacher_Username_Exact);

profile_Routes.get("/profile/following/:id", Autenticate.autenticate, ProfileControllers.verify_follow);

profile_Routes.post("/profile/follow/:id", Autenticate.autenticate, ProfileControllers.follow_user);


export default profile_Routes;


