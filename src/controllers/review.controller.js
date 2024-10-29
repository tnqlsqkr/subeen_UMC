import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview  } from "../services/review.service.js";

export const reviewController = async (req, res, next) => {
  console.log("리뷰 추가하기를 요청했습니다!");
  console.log("body:", req.body); 

  const newReview = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: newReview });
};
