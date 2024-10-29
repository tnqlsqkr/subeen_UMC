import { addMission, getMission } from "../repositories/user.repository.js";
import { responseFromMission } from "../dtos/user.dto.js";

export const createMission  = async (data) => {
  const addMissionId = await addMission({
	  store_id : data.store_id,
    reward : data.reward,
    deadline : data.deadline,
    mission_spec : data.mission_spec,
  });

  if (addMissionId === null) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const mission = await getMission(addMissionId);
  return responseFromMission(mission);
};