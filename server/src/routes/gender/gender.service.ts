import prisma from "../../../prisma/prisma-client";
import { Gender } from "./gender.model";

export const getGenders = async (): Promise<Gender[]> => {
  const genders = await prisma.gender.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return genders;
};
