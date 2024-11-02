import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { missionStatusController } from "./controllers/MissionChallenge.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/missions/status", missionStatusController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});