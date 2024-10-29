import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/user.dto.js";
import { createStore } from "../services/user.service.js";

export const addStoreController = async (req, res, next) => {
  console.log("해당 지역에 가게 추가를 요청합니다");
  console.log("body:", req.body);

  const user = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};
