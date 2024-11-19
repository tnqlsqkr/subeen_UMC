export const bodyToUser = (body) =>{
    const birth = new Date(body.birth);

    return {
        email : body.email,
        password : body.password,
        name : body.name,
        gender : body.gender,
        birth : birth,
        address : body.address || "",
        specAddress : body.spec_address || "",
        phoneNumber : body.phoneNumber,
        preferences : body.preferences
    }
}

export const responseFromUser = ({ member, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    id: member.id.toString(),
    email: member.email,
    name: member.name,
    preferCategory: preferFoods,
  };
};
  