import prisma from "../../../prisma/prisma-client";
import { getGenderByName } from "../gender/gender.service";
import {
  createUser,
  getSleepTotalsByDateRange,
  getUserByNameAndGender,
} from "../user/user.service";
import HttpException from "../../models/http-exception.model";
import CreateSleepRecord from "./interfaces/CreateSleepRecord";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const getGenderId = async (genderName: string | undefined) => {
  if (!genderName) return undefined;

  try {
    return (await getGenderByName(genderName))?.id;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code == "P2025") {
      throw new HttpException(404, err.message);
    }
    throw new HttpException(400, err);
  }
};

const getOrCreateUser = async (
  name: string,
  genderId: number | undefined,
  date: Date,
  hoursSlept: number
) => {
  let user = await getUserByNameAndGender(name, genderId);
  if (!user) {
    user = await createUser(name, genderId);
  } else {
    const totalLogged = await getSleepTotalsByDateRange(user.id, date);
    const totalHoursSlept =
      totalLogged.length > 0 ? totalLogged[0]._sum.hoursSlept || 0 : 0;
    if (totalHoursSlept + hoursSlept > 24) {
      throw new HttpException(
        400,
        `Failed to save time, logging ${hoursSlept} hours would exceed 24 hours for ${
          user.name ?? name
        }`
      );
    }
  }

  return user;
};

export const createSleepRecord = async (sleepRecord: CreateSleepRecord) => {
  const { name, gender, hoursSlept, date: dateStr } = sleepRecord;
  const date = new Date(dateStr);

  const genderId = await getGenderId(gender);
  const user = await getOrCreateUser(name, genderId, date, hoursSlept);

  const createdSleepRecord = await prisma.sleepRecord.create({
    data: {
      hoursSlept,
      date: new Date(date),
      userId: user.id,
    },
  });

  return createdSleepRecord;
};
