import multer from "multer";
import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";
import Autenticate from "./middlewares/Autenticate";
import multer_config from "../config/multer_config";

const profile_Routes = Router();

profile_Routes.get("/profile", Autenticate.autenticate, ProfileControllers.seacher_Profile);

profile_Routes.get("/profile/following", Autenticate.autenticate, ProfileControllers.seacher_following);

profile_Routes.get("/profile/:username", Autenticate.autenticate, ProfileControllers.seacher_UserName);

profile_Routes.get("/profile/following/:id", Autenticate.autenticate, ProfileControllers.verify_follow);

profile_Routes.post("/profile/follow/:id", Autenticate.autenticate, ProfileControllers.follow_user);

profile_Routes.post("/profile/upload/", Autenticate.autenticate, multer(multer_config).single("file"), ProfileControllers.upload_Photo);

profile_Routes.put("/profile/upload/", Autenticate.autenticate, multer(multer_config).single("fileProfile"), ProfileControllers.upload_Profile_Photo);

profile_Routes.delete("/profile/unfollow/:id", Autenticate.autenticate, ProfileControllers.unfollow_Service);


export default profile_Routes;


