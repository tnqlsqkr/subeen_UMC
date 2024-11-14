import { addReview, getReview, getUserReviews } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { ReviewListFetchError } from "../errors.js";

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
  return responseFromReview([review]);
};

export const listUserReviewsService = async (memberId) => {
  try {
      const reviews = await getUserReviews(memberId);
      if (!reviews || reviews.length === 0) {
          throw new ReviewListFetchError("리뷰를 찾을 수 없습니다.", { memberId });
      }
      return responseFromReviews(reviews);
  } catch (error) {
      if (error instanceof ReviewListFetchError) {
          throw error;
      }
      console.error("리뷰 목록 조회 중 오류가 발생했습니다:", error);
      throw new Error("리뷰 목록 조회 중 오류가 발생했습니다.");
  }
};

 