export const bodyToReview = (body) => {

  return {
	  store_id : body.store_id,
    member_id : body.member_id,
    score : body.score,
    body : body.body,
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    store_id: review.store_id,
    member_id: review.member_id,
    score: review.score,
    body: review.body,
    created_at: review.created_at, 
    updated_at: review.updated_at, 
  };
};