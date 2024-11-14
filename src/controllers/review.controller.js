import { StatusCodes } from "http-status-codes";
import { listUserReviewsService, createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";


export const reviewController = async (req, res, next) => {
  console.log("리뷰 추가하기를 요청했습니다!");
  console.log("body:", req.body); 

  const newReview = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: newReview });
};

export const getMyReviewsController = async (req, res, next) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const result = await listUserReviewsService(memberId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};