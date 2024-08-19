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
