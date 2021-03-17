import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";

const profile_Routes = Router();

profile_Routes.get("/profile", ProfileControllers.seacher_Profile);


export default profile_Routes;


