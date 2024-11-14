
export const bodyToStore = (body) => {
  return {
      name: body.name,
      address: body.address,
      region_Id: parseInt(body.regionId),
      score: parseFloat(body.score)      
  };
};

export const responseFromStore = (data) => {
  if (Array.isArray(data)) { 
    return {
        data: data.map(mission => ({
            id: mission.id.toString(),  
            storeId: mission.storeId.toString(), 
            storeName: mission.store.name,
            reward: Number(mission.reward), 
            deadline: mission.deadline,
            missionSpec: mission.missionSpec,
            createdAt: mission.createdAt
        })),
        pagination: {
            cursor: data.length ? data[data.length - 1].id.toString() : null,  // BigInt를 문자열로 변환
        }
    };
}

  return {
      data: {
          id: data.id.toString(),
          name: data.name,
          address: data.address,
          score: data.score,
          regionId: data.regionId?.toString()
      },
      pagination: {
          cursor: null
      }
  };
};