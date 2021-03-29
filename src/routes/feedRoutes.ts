import { Router } from "express";
import FeedControllers from "../controllers/FeedControllers";
import Autenticate from "./middlewares/Autenticate";

const feed_routes = Router();

feed_routes.get("/feed", Autenticate.autenticate, FeedControllers.list_feed);

feed_routes.get("/feed/like/:id", Autenticate.autenticate, FeedControllers.like_photo);

feed_routes.get("/feed/like/photo/:id", Autenticate.autenticate, FeedControllers.verify_like_photo);

export default feed_routes;