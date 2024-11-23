import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";
import { ActiveMissionListFetchError } from "../errors.js";

export const addMission = async (data) => {
    const created = await prisma.mission.create({ data: {
        storeId: data.storeId,
   	    reward: data.reward,
    	deadline: data.deadline,
    	missionSpec: data.missionSpec
	} 
    });
    return created.id;
};



export const getMission = async (missionId) => {
    try {
        const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
        return mission;
    } catch (error) {
        console.error("미션 조회 중 오류:", error);
        throw new Error("미션을 찾을 수 없습니다.");
    }
};

//내가 진행중인 미션 조회
export const getInProcessMissions = async (memberId) => {
    try {
        const member = await prisma.member.findUnique({
            where: { id: memberId }
        });

        if (!member) {
            throw new ActiveMissionListFetchError("존재하지 않는 사용자입니다.", { memberId });
        }

        const missions = await prisma.memberMission.findMany({
            where: {
                memberId: memberId,
                status: "진행중"
            },
            include: {
                mission: {
                    include: {
                        store: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                mission: {
                    deadline: 'asc'
                }
            }
        });

        if (missions.length === 0) {
            throw new ActiveMissionListFetchError("진행 중인 미션이 없습니다.", { memberId });
        }

        // mission 정보로 변환
        const formattedMissions = missions.map(memberMission => ({
            id: memberMission.mission.id.toString(),
            storeId: memberMission.mission.storeId.toString(),
            reward: Number(memberMission.mission.reward),
            deadline: memberMission.mission.deadline,
            missionSpec: memberMission.mission.missionSpec,
            status: memberMission.status,
            store: {
                id: memberMission.mission.store.id.toString(),
                name: memberMission.mission.store.name
            }
        }));

        return formattedMissions;
    } catch (error) {
        if (error instanceof ActiveMissionListFetchError) {
            throw error;
        }
        console.error("Error:", error);
        throw new Error("진행 중인 미션 조회 중 오류가 발생했습니다.");
    }
};