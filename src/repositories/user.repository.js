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
    try {
        const member = await prisma.member.findFirstOrThrow({ where: { id: memberId } });
        return member;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("User not found");
    }
};

export const setPreference = async (memberId, categoryId) => {
    await prisma.userFavorCategory.create({
      data: {
        memberId: memberId,
        categoryId: categoryId,
      },
    });
};

export const getUserPreferencesByUserId = async (memberId) => {
    const preferences = await prisma.userFavorCategory.findMany({
        select: {
        id: true,
        memberId: true,
        categoryId: true,
        foodCategory: true,
      },
      where: { memberId: memberId },
      orderBy: { categoryId: "asc" },
    });
    return preferences;
};

export const getAllStoreReviews = async (storeId, cursor) => {
    const reviews = await prisma.userStoreReview.findMany({
      select: { id: true, content: true, store: true, user: true },
      where: { storeId: storeId, id: { gt: cursor } },
      orderBy: { id: "asc" },
      take: 5,
    });
  
    return reviews;
};


