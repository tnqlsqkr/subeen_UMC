import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { prisma } from './db.config.js';
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import { getMyReviewsController } from "./controllers/review.controller.js";
import { missionStatusController, completeMissionController } from "./controllers/MissionChallenge.controller.js";
import { missionController } from "./controllers/mission.controller.js";
import { addStoreController, getStoreMissionsController } from "./controllers/store.controller.js";
import { reviewController } from "./controllers/review.controller.js";
import { getInProcessMissionsController } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
    res.success = (success) => {
      return res.json({ resultType: "SUCCESS", error: null, success });
    };
  
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
      return res.json({
        resultType: "FAIL",
        error: { errorCode, reason, data },
        success: null,
      });
    };
    next();
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; 
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

//게시글 작성
app.post("/api/v1/users/signup", handleUserSignUp);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

//가게의 미션 목록 조회
app.get("/api/v1/stores/:storeId/missions", getStoreMissionsController);

//진행 중인 미션 목록 조회
app.get("/api/v1/users/:memberId/missions", getInProcessMissionsController);

//가게에 리뷰 추가
app.post("/api/stores/reviews", reviewController);

//특정 지역에 가게 추가
app.post("/api/regions/addstore", addStoreController);

//가게에 미션 추가
app.post("/api/stores/mission", missionController);

//가게의 미션을 도전 중인 미션에 추가
app.post("/api/missions/status", missionStatusController);

// 미션 완료 처리 라우트 추가
app.patch("/api/v1/missions/complete", completeMissionController);

// 내가 작성한 리뷰 목록 조회
app.get("/api/v1/users/:memberId/reviews", getMyReviewsController);

app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
  
    res.status(err.statusCode || 500).error({
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
