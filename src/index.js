<<<<<<< Updated upstream
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";

dotenv.config();
=======
import express from 'express'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import session from 'express-session';
import { prisma } from './db.config.js'
>>>>>>> Stashed changes

const app = express();
const port = process.env.PORT;

<<<<<<< Updated upstream
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 'extended'를 true로 설정

app.get('/', (req, res) => {
    res.send('Hello World!');
=======
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/', (req,res)=>{
    res.send('Hello World!')
>>>>>>> Stashed changes
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
