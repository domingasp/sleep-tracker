import request from "supertest";
import * as sleepRecordService from "./sleep-record.service";
import * as genderService from "../gender/gender.service";
import * as userService from "../user/user.service";
import app from "../../app";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaMock } from "../../../singleton";

test("POST /sleep-records must call createSleepRecord methods", async () => {
  const sleepRecordPayload = {
    name: "John",
    gender: "Man",
    hoursSlept: 8,
    date: "2024-08-18",
  };
  const createSleepRecordSpy = jest
    .spyOn(sleepRecordService, "createSleepRecord")
    .mockImplementation();

  await request(app).post("/api/sleep-records").send(sleepRecordPayload);

  expect(createSleepRecordSpy).toHaveBeenCalledWith(sleepRecordPayload);
  createSleepRecordSpy.mockRestore();
});

describe("createSleepRecord", () => {
  const mockUser = { id: 1, name: "Jane", genderId: 1 };
  const createSleepRecordPayload = {
    name: mockUser.name,
    gender: "Woman",
    hoursSlept: 8,
    date: "2024-08-18",
  };

  let createSleepRecordSpy: jest.SpyInstance;

  beforeEach(() => {
    createSleepRecordSpy = jest.spyOn(prismaMock.sleepRecord, "create");
  });

  afterEach(() => {
    createSleepRecordSpy.mockRestore();
  });

  it("throws error if gender not found", async () => {
    const getGenderByNameSpy = jest.spyOn(genderService, "getGenderByName");
    getGenderByNameSpy.mockRejectedValue(
      new PrismaClientKnownRequestError("Gender not found", {
        code: "P2025",
        clientVersion: "",
      })
    );

    expect(
      sleepRecordService.createSleepRecord({
        name: "John",
        gender: "Non-Existent",
        hoursSlept: 8,
        date: "2024-08-18",
      })
    ).rejects.toThrow("Gender not found");
  });

  it("creates a user if none found and create sleep record", async () => {
    jest
      .spyOn(genderService, "getGenderByName")
      .mockResolvedValue({ id: 1, name: "Woman" });
    jest.spyOn(userService, "getUserByNameAndGender").mockResolvedValue(null);
    jest.spyOn(userService, "createUser").mockResolvedValue(mockUser);
    createSleepRecordSpy.mockResolvedValue({
      ...createSleepRecordPayload,
      date: new Date(createSleepRecordPayload.date),
    });

    const res = await sleepRecordService.createSleepRecord(
      createSleepRecordPayload
    );

    expect(res).toEqual({
      ...createSleepRecordPayload,
      date: new Date(createSleepRecordPayload.date),
    });
    expect(createSleepRecordSpy).toHaveBeenCalledWith({
      data: {
        hoursSlept: createSleepRecordPayload.hoursSlept,
        date: new Date(createSleepRecordPayload.date),
        userId: mockUser.id,
      },
    });
  });

  it("throws error if user exists and total hours slept + hours slept more than 24 hours", async () => {
    jest
      .spyOn(genderService, "getGenderByName")
      .mockResolvedValue({ id: 1, name: "Woman" });
    jest
      .spyOn(userService, "getUserByNameAndGender")
      .mockResolvedValue(mockUser);
    jest
      .spyOn(userService, "getSleepTotalsByDateRange")
      .mockResolvedValue([
        { _sum: { hoursSlept: 24 }, date: new Date("2024-08-16") },
      ]);

    expect(
      sleepRecordService.createSleepRecord(createSleepRecordPayload)
    ).rejects.toThrow(
      `Failed to save time, logging ${createSleepRecordPayload.hoursSlept} hours would exceed 24 hours for ${mockUser.name}`
    );
  });

  it("creates sleep record if user exists and total hours slept + hours slept less than 24 hours", async () => {
    jest
      .spyOn(genderService, "getGenderByName")
      .mockResolvedValue({ id: 1, name: "Woman" });
    jest.spyOn(userService, "getUserByNameAndGender").mockResolvedValue(null);
    jest
      .spyOn(userService, "getSleepTotalsByDateRange")
      .mockResolvedValue([
        { _sum: { hoursSlept: 2 }, date: new Date("2024-08-16") },
      ]);
    createSleepRecordSpy.mockResolvedValue({
      ...createSleepRecordPayload,
      date: new Date(createSleepRecordPayload.date),
    });

    const res = await sleepRecordService.createSleepRecord(
      createSleepRecordPayload
    );

    expect(res).toEqual({
      ...createSleepRecordPayload,
      date: new Date(createSleepRecordPayload.date),
    });
    expect(createSleepRecordSpy).toHaveBeenCalledWith({
      data: {
        hoursSlept: createSleepRecordPayload.hoursSlept,
        date: new Date(createSleepRecordPayload.date),
        userId: mockUser.id,
      },
    });
  });
});
