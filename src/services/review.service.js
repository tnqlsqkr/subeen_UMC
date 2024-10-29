import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview  = async (data) => {
  const addReviewId = await addReview({
	  store_id : data.store_id,
    member_id : data.member_id,
    score : data.score,
    body : data.body,
  });

  if (addReviewId === null) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const review = await getReview(addReviewId);
  return responseFromReview(review);
};