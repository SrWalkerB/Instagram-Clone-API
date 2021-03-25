import { Router } from "express";
import FeedControllers from "../controllers/FeedControllers";
import Autenticate from "./middlewares/Autenticate";

const feed_routes = Router();

feed_routes.get("/feed", Autenticate.autenticate, FeedControllers.list_feed);

export default feed_routes;