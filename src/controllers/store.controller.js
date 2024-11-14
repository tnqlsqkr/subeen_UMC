import { createStore,listStoreReviews, listStoreMissionsService } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";

export const addStoreController = async (req, res, next) => {
  console.log("해당 지역에 가게 추가를 요청합니다");
  console.log("body:", req.body);

  const user = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const getStoreMissionsController = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId);
  try {
      const missions = await listStoreMissionsService(storeId);
      res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
      next(error);
  }
};