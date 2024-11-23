export const bodyToReview = (body) => {

    return {
        store_id : body.storeId,
      member_id : body.memberId,
      score : body.score,
      body : body.body,
    };
};

export const responseFromReviews = (reviews) => {
    return {
        data: reviews.map(review => ({
            id: review.id.toString(),
            store_id: review.storeId.toString(),
            member_id: review.memberId.toString(),
            score: review.score,
            body: review.body,
        })),
    };
}