import {getAllStoreReviews} from "../repositories/review.repository.js";
import {responseFromReviews} from "../dtos/review.dto.js"; 

import {getStoreMissions} from "../repositories/store.repository.js";
import {responseFromStore} from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const listStoreMissionsService = async (storeId) => {
  const missions = await getStoreMissions(storeId);
  return responseFromStore(missions);
};
