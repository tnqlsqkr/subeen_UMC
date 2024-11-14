import { prisma } from "../db.config.js";
import { MissionNotFoundError } from "../errors.js";

export const addStore = async (data) => {
    try {
        const created = await prisma.store.create({ 
            data: {
                name: data.name,
                address: data.address,
                regionId: data.region_Id, 
                score: data.score
            }
        });
        return created.id;
    } catch (error) {
        throw new Error("가게 등록 중 오류가 발생했습니다.");
    }
};


export const getStore = async (storeId) => {
    try {
        const store = await prisma.store.findFirstOrThrow({ where: { id: storeId } });
        return store;
    } catch (error) {
        console.error("Error fetching store:", error);
        throw new Error("Store not found");
    }
};

//특정 가게의 미션 조회 
export const getStoreMissions = async (storeId) => {
    try {
        const store = await prisma.store.findUnique({
            where: { id: storeId }
        });

        if (!store) {
            throw new MissionNotFoundError("존재하지 않는 가게입니다.", { storeId });
        }

        const missions = await prisma.mission.findMany({
            where: { storeId: storeId },
            include: {
                store: {
                    select: {
                        name: true,
                        address: true
                    }
                }
            }
        });

        if (missions.length === 0) {
            throw new MissionNotFoundError("해당 가게의 미션이 존재하지 않습니다.", { storeId });
        }

        return missions;
    } catch (error) {
        if (error instanceof MissionNotFoundError) {
            throw error;
        }
        throw new Error("미션 조회 중 오류가 발생했습니다.");
    }
};