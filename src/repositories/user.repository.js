import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addUser = async (data) => {
    const member = await prisma.member.findFirst({ where: { email: data.email } });
    if (member) {
      return null;
    }
  
    const created = await prisma.member.create({ data: data });
    return created.id;
};

export const getUser = async (memberId) => {
    const member = await prisma.user.findFirstOrThrow({ where: { id: memberId } });
    return member;
};
  

export const setPreference = async (memberId, foodCategoryId) => {
    await prisma.userFavorCategory.create({
      data: {
        memberId: memberId,
        categoryId: foodCategoryId,
      },
    });
};

export const getUserPreferencesByUserId = async (memberId) => {
    const preferences = await prisma.userFavorCategory.findMany({
        select: {
        id: true,
        memberId: true,
        foodCategoryId: true,
        foodCategory: true,
      },
      where: { memberId: memberId },
      orderBy: { foodCategoryId: "asc" },
    });
    return preferences;
};