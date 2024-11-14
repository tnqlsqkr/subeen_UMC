export const bodyToMission = (body) => {
	const deadline = new Date(body.deadline);
	
  return {
	  store_id : body.store_id,
    reward : body.reward,
    deadline,
    mission_spec : body.mission_spec,
  };
};

export const responseFromStoreMissions = (missions) => {
    return {
        data: missions.map(mission => ({
            id: mission.id,
            storeId: mission.storeId,
            reward: mission.reward,
            deadline: mission.deadline,
            missionSpec: mission.missionSpec,
            status: mission.status,
        })),
    };
};

export const responseFromInProcessMissions = (missions) => {
    return {
        data: missions.map(mission => ({
            id: mission.id.toString(),  
            storeId: mission.storeId.toString(), 
            reward: Number(mission.reward),  
            deadline: mission.deadline,
            missionSpec: mission.missionSpec,
            status: mission.status,
            store: {
                id: mission.store.id.toString(),  
                name: mission.store.name,
            }
        })),
    };
};