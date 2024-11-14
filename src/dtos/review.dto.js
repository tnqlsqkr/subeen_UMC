export const bodyToReview = (body) => {

    return {
        store_id : body.store_id,
      member_id : body.member_id,
      score : body.score,
      body : body.body,
    };
};

export const responseFromReviews = (reviews) => {
    return {
        data: reviews.map(review => ({
            id: review.id.toString(),
            storeId: review.storeId.toString(),
            storeName: review.store?.name,
            memberId: review.memberId.toString(),
            score: review.score,
            body: review.body,
        })),
    };
}