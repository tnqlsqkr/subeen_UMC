export const bodyToStore = (body) => {
    return {
      name: body.name,
      address: body.address,
      region_Id : body.regionId,
      score : body.score
    };
  };
  
  export const responseFromStore = (store) => ({
    id: store.id,
    name: store.name,
    address: store.address,
    region_id: store.region_id,
    score : store.score
  });