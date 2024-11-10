import { listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";
import { listStoreMissionsService } from "../services/store.service.js";

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