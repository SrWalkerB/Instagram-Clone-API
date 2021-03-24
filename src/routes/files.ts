import path from "path";
import express from "express";

const files = express.Router();

files.use("/files/", express.static(path.resolve(__dirname, "..", "..", "uploads")))


export default files;