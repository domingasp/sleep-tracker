import { prismaMock } from "../../../singleton";
import {
  createUser,
  getSleepTotalsByDateRange,
  getUserByNameAndGender,
} from "./user.service";

describe("getUserByNameAndGender", () => {
  let findFirstSpy: jest.SpyInstance;

  beforeEach(() => {
    findFirstSpy = jest.spyOn(prismaMock.user, "findFirst");
  });

  afterEach(() => {
    findFirstSpy.mockRestore();
  });

  it("must filter by gender if defined", async () => {
    const mockUser = { id: 1, name: "John", genderId: null };
    const nameToFind = "John";
    const genderIdToFind = undefined;
    findFirstSpy.mockResolvedValue(mockUser);

    const res = await getUserByNameAndGender(nameToFind, genderIdToFind);

    expect(res).toEqual(mockUser);
    expect(findFirstSpy).toHaveBeenCalledWith({
      where: {
        name: {
          equals: nameToFind,
          mode: "insensitive",
        },
      },
    });
  });

  it("must only query by name if genderId undefined", async () => {
    const mockUser = { id: 1, name: "John", genderId: 1 };
    const nameToFind = "John";
    const genderIdToFind = 1;
    findFirstSpy.mockResolvedValue(mockUser);

    const res = await getUserByNameAndGender(nameToFind, genderIdToFind);

    expect(res).toEqual(mockUser);
    expect(findFirstSpy).toHaveBeenCalledWith({
      where: {
        name: {
          equals: nameToFind,
          mode: "insensitive",
        },
        genderId: {
          equals: genderIdToFind,
        },
      },
    });
  });
});

describe("getSleepTotalsByDateRange", () => {
  let groupBySpy: jest.SpyInstance;

  beforeEach(() => {
    groupBySpy = jest.spyOn(prismaMock.sleepRecord, "groupBy");
  });

  afterEach(() => {
    groupBySpy.mockRestore();
  });

  it("returns aggregated hoursSlept grouped by date", async () => {
    const mockGroupedByData = [
      { _sum: { hoursSlept: 7 }, date: "2024-08-15T00:00:00.000Z" },
      { _sum: { hoursSlept: 24 }, date: "2024-08-16T00:00:00.000Z" },
    ];
    const userIdToFind = 1;
    const startDateToFind = new Date("2024-08-15");
    const endDateToFind = new Date("2024-08-16");
    groupBySpy.mockResolvedValue(mockGroupedByData);

    const res = await getSleepTotalsByDateRange(
      userIdToFind,
      startDateToFind,
      endDateToFind
    );

    expect(res).toEqual(mockGroupedByData);
    expect(groupBySpy).toHaveBeenCalledWith({
      by: ["date"],
      _sum: {
        hoursSlept: true,
      },
      where: {
        userId: userIdToFind,
        date: {
          gte: startDateToFind,
          lte: endDateToFind,
        },
      },
    });
  });

  it("returns aggregated hoursSlept grouped by date use start date if end date not present", async () => {
    const mockGroupedByData = [
      { _sum: { hoursSlept: 24 }, date: "2024-08-16T00:00:00.000Z" },
    ];
    const userIdToFind = 1;
    const startDateToFind = new Date("2024-08-15");
    groupBySpy.mockResolvedValue(mockGroupedByData);

    const res = await getSleepTotalsByDateRange(userIdToFind, startDateToFind);

    expect(res).toEqual(mockGroupedByData);
    expect(groupBySpy).toHaveBeenCalledWith({
      by: ["date"],
      _sum: {
        hoursSlept: true,
      },
      where: {
        userId: userIdToFind,
        date: {
          gte: startDateToFind,
          lte: startDateToFind,
        },
      },
    });
  });
});

test("createUser creates a user", async () => {
  const mockUser = { id: 1, name: "John", genderId: null };
  const nameToCreate = "John";
  const genderIdToCreate = undefined;
  const createSpy = jest.spyOn(prismaMock.user, "create");
  createSpy.mockResolvedValue(mockUser);

  const res = await createUser(nameToCreate, genderIdToCreate);

  expect(res).toEqual(mockUser);
  expect(createSpy).toHaveBeenCalledWith({
    data: {
      name: nameToCreate,
      genderId: genderIdToCreate,
    },
  });
});
