import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "../../../prisma/prisma-client";
import UserDto from "./interfaces/UserDto";
import { sleepRecordMapper, userMapper } from "./user.mapper";

export const getUsers = async (): Promise<UserDto[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { SleepRecord: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return users.map(userMapper);
};

export const getUserByNameAndGender = async (
  name: string,
  genderId?: number
) => {
  const query: Prisma.UserFindFirstArgs<DefaultArgs> = {
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  };

  if (query.where && genderId) query.where.genderId = { equals: genderId };

  return await prisma.user.findFirst(query);
};

export const getSleepTotalsByDateRange = async (
  userId: number,
  startDate: Date,
  endDate?: Date
) => {
  const sleepRecords = await prisma.sleepRecord.groupBy({
    by: ["date"],
    _sum: {
      hoursSlept: true,
    },
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate ?? startDate,
      },
    },
  });

  return sleepRecords.map(sleepRecordMapper);
};

export const createUser = async (name: string, genderId?: number) => {
  return await prisma.user.create({
    data: {
      name: name.trim(),
      genderId: genderId,
    },
  });
};
