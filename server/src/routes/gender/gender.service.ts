import prisma from "../../../prisma/prisma-client";
import { Gender } from "./gender.model";

export const getGenders = async (): Promise<Gender[]> => {
  return await prisma.gender.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

/**
 * @throws {PrismaClientKnownRequestError} throws an error if gender not found
 */
export const getGenderByName = async (
  genderName: string
): Promise<Gender | null> => {
  return await prisma.gender.findFirstOrThrow({
    where: {
      name: {
        equals: genderName,
        mode: "insensitive",
      },
    },
  });
};
