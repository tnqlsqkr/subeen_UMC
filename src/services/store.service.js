import { responseFromStore } from "../dtos/store.dto.js"; 
import { addStore, getStore } from "../repositories/store.repository.js";

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