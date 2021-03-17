import "reflect-metadata";
import "./database/connect";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import login_Routes from "./routes/loginRoutes";
import profile_Routes from "./routes/profileRoutes";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(login_Routes);

app.use(profile_Routes);


export default app;