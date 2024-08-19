import request from "supertest";
import { prismaMock } from "../../../singleton";
import app from "../../app";
import { getGenders } from "./gender.service";
import * as genderService from "./gender.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

test("GET /genders must call getGenders methods", async () => {
  const getGendersSpy = jest
    .spyOn(genderService, "getGenders")
    .mockImplementation(async () => []);

  await request(app).get("/api/genders");

  expect(getGendersSpy).toHaveBeenCalled();
  getGendersSpy.mockRestore();
});

test("getGenders must return all available genders", async () => {
  const genders = [
    {
      id: 1,
      name: "Woman",
    },
    {
      id: 2,
      name: "Man",
    },
  ];
  prismaMock.gender.findMany.mockResolvedValue(genders);

  const res = getGenders();

  expect(res).resolves.toEqual(genders);
});

describe("getGenderByName", () => {
  let findFirstOrThrowSpy: jest.SpyInstance;

  beforeEach(() => {
    findFirstOrThrowSpy = jest.spyOn(prismaMock.gender, "findFirstOrThrow");
  });

  afterEach(() => {
    findFirstOrThrowSpy.mockRestore();
  });

  it("returns gender if it exists", async () => {
    const mockGender = { id: 1, name: "Woman" };
    const genderNameToSearch = "Woman";
    findFirstOrThrowSpy.mockResolvedValue(mockGender);

    const res = await genderService.getGenderByName(genderNameToSearch);

    expect(res).toEqual(mockGender);
    expect(findFirstOrThrowSpy).toHaveBeenCalledWith({
      where: {
        name: {
          equals: genderNameToSearch,
          mode: "insensitive",
        },
      },
    });
  });

  it("throws HttpException if gender does not exist", async () => {
    const genderNameToSearch = "NonExistent";
    findFirstOrThrowSpy.mockRejectedValue(
      new PrismaClientKnownRequestError("Gender not found", {
        code: "P2025",
        clientVersion: "",
      })
    );

    expect(genderService.getGenderByName(genderNameToSearch)).rejects.toThrow(
      "Gender not found"
    );
    expect(findFirstOrThrowSpy).toHaveBeenCalledWith({
      where: {
        name: {
          equals: genderNameToSearch,
          mode: "insensitive",
        },
      },
    });
  });
});
