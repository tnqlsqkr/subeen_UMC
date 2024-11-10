import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addMission = async (data) => {
    const created = await prisma.mission.create({ data: {
	 storeId: data.store_id,
   	 reward: data.reward,
    	 deadline: data.deadline,
    	 missionSpec: data.mission_spec
	} 
    });
    return created.id;
};


export const getMission = async (missionId) => {
    try {
        const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
        return mission;
    } catch (error) {
        console.error("Error fetching mission:", error);
        throw new Error("Mission not found");
    }
};

//내가 진행중인 미션 조회
export const getInProcessMissions = async (memberId) => {
    try{
        const missions = await prisma.mission.findMany({
            where : {
                status : "진행중",
                memberId : memberId,
            },
            include : {
                store : true,
            },
        });
        return missions;
    } catch (error){
        console.log("Error fetching in-progress missions: ", error);
        throw new Error("InProgressMissions not found");
    }
};