import request from "supertest";
import { prismaMock } from "../../../singleton";
import app from "../../app";
import { getGenders } from "./gender.service";
import * as genderService from "./gender.service";

test("/genders must call getGenders methods", async () => {
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
