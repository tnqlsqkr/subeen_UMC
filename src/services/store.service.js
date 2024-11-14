import {getAllStoreReviews} from "../repositories/review.repository.js";
import {responseFromReviews} from "../dtos/review.dto.js"; 

import {addStore, getStore, getStoreMissions} from "../repositories/store.repository.js";
import {responseFromStore} from "../dtos/store.dto.js";

export const createStore = async (data) => {
  const joinStoreId = await addStore({
    id: data.id,
    name: data.name,
    address: data.address,
    region_Id : data.region_Id,
    score : data.score
  });

  if (joinStoreId === null) { 
    throw new Error("이미 존재하는 가게입니다.");
  }

  const store = await getStore(joinStoreId);
  return responseFromStore(store);
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const listStoreMissionsService = async (storeId) => {
  try {
      if (!storeId || isNaN(storeId)) {
          throw new MissionNotFoundError("올바르지 않은 가게 ID입니다.");
      }

      const missions = await getStoreMissions(storeId);
      return responseFromStore(missions);
  } catch (error) {
      if (error instanceof MissionNotFoundError) {
          throw error;
      }
      throw new Error("미션 목록 조회 중 오류가 발생했습니다.");
  }
};
