import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // taken from inclusive language guidelines - https://www.csusm.edu/ipa/surveys/inclusive-language-guidelines.html
    await prisma.gender.createMany({
      data: [
        { id: 1, name: "Woman" },
        { id: 2, name: "Man" },
        { id: 3, name: "Transgender" },
        { id: 4, name: "Non-binary/non-conforming" },
      ],
    });
  } catch (err) {
    throw err;
  }
};

main().catch((err) => {
  console.warn("Error while generating database seed: \n", err);
});
