import { Router } from "express";
import populatedDatabase from "../utils/populatedDatabase";

const populatedRoute = Router();


populatedRoute.get("/populated", populatedDatabase.populated);



export default populatedRoute;