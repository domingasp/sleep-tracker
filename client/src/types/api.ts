export type BaseEntity = {
  id: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Gender = Entity<{ name: string }>;

export type User = Entity<{
  name: string;
  entryCount: number;
}>;

export type GroupedBySleepRecord = {
  date: string;
  hoursSlept: number;
};

export type SleepRecord = {
  id: number;
  date: string;
  hoursSlept: number;
  userId: number;
};
