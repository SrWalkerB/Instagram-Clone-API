import { Router } from "express";
import populatedDatabase from "../utils/populatedDatabase";

const populatedRoute = Router();

//Rota somente para popular o database

populatedRoute.get("/populated", populatedDatabase.populated);



export default populatedRoute;