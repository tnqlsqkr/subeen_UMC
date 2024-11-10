export const responseFromReviews = (reviews) => {
    return {
        data: reviews.map(review => ({
            id: review.id,
            storeId: review.storeId,
            memberId: review.memberId,
            score: review.score,
            body: review.body,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        })),
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
}