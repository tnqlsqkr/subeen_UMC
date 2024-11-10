import { getInProcessMissions } from "../repositories/mission.repository.js";
import { responseFromInProcessMissions } from "../dtos/mission.dto.js";

export const listInProcessMissionsService = async (memberId) => {
    const missions = await getInProcessMissions(memberId);
    return responseFromInProcessMissions(missions); 
};