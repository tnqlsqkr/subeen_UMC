export const bodyToUser = (body) =>{
    const birth = new Date(body.bitrth);

    return {
        email : body.email,
        name : body.name,
        gender : body.gender,
        address : body.address || "",
        detailAddress : body.spec_Address || "",
        phoneNumber : body.phoneNumber,
        preferences : body.preferences
    }
}

export const responseFromUser = (user, preferences) =>{
    const foodCategoryNames = queryResult.map(item => item.name);

    return {
        email :user.email,
        name : user.name,
        preferCategory : foodCategoryNames
    }
}