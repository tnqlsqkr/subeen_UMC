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
            id: mission.id,
            storeId: mission.storeId,
            reward: mission.reward,
            deadline: mission.deadline,
            missionSpec: mission.missionSpec,
            status: mission.status,
            store: {
                id: mission.store.id,
                name: mission.store.name,
            }
        })),
    };
};