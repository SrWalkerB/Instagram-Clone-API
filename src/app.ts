import "reflect-metadata";
import "./database/connect";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import express from "express";
import login_Routes from "./routes/loginRoutes";
import profile_Routes from "./routes/profileRoutes";
import populatedRoute from "./routes/utils";
import files from "./routes/files";
import feed_routes from "./routes/feedRoutes";
dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

app.use(login_Routes);

app.use(profile_Routes);

app.use(populatedRoute);

app.use(feed_routes);

app.use(files);


export default app;