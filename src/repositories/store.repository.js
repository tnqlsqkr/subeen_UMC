import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";


export const addStore = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.store_id } });
    if (store) {
      return null;
    }
  
    const created = await prisma.store.create({ data: {
        name: data.name,
   	    address: data.address,
    	regionId: region_id,
    	score: data.score
    }});
    return created.id;
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
        const missions = await prisma.mission.findMany({
            where: {storeId: storeId,},
            include: { store: true, },
        });
        return missions; 
    } catch (error) {
        console.error("Error fetching store missions:", error);
        throw new Error("store mission not found");
    }
};