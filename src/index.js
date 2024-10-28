import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { reviewController } from "./controllers/user.controller.js";

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

app.post("/api/stores/reviews", reviewController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});