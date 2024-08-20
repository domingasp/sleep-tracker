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

export type SleepRecord = { date: string; hoursSlept: number };
