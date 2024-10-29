export const bodyToMission = (body) => {
	const deadline = new Date(body.deadline);
	
  return {
	  store_id : body.store_id,
    reward : body.reward,
    deadline,
    mission_spec : body.mission_spec,
  };
};

export const responseFromMission = (mission) => {
  return {
    id: mission.id,
    store_id: mission.store_id,
    reward : mission.reward,
    deadline: mission.deadline,
    mission_spec: mission.mission_spec, 
  };
};