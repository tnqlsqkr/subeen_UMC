import { getUserReviews } from "../repositories/review.repository.js";
import { responseFromStore } from "../dtos/review.dto.js";


export const listUserReviewsService = async (memberId) => {
    const reviews = await getUserReviews(memberId);
    return responseFromStore(reviews);
};

 