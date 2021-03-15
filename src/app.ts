import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import login_Routes from "./routes/loginRoutes";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(login_Routes);



export default app;