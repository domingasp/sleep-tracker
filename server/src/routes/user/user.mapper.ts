import SleepRecordDto from "./interfaces/SleepRecordDto";
import UserDto from "./interfaces/UserDto";

export const userMapper = (user: {
  id: number;
  name: string;
  _count: {
    SleepRecord: number;
  };
}): UserDto => ({
  id: user.id,
  name: user.name,
  entryCount: user._count.SleepRecord,
});

export const sleepRecordMapper = (sleepRecord: {
  date: Date;
  _sum: {
    hoursSlept: number | null;
  };
}): SleepRecordDto => ({
  date: sleepRecord.date,
  hoursSlept: sleepRecord._sum.hoursSlept ?? 0,
});
