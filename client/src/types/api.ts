export type BaseEntity = {
  id: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Gender = Entity<{ name: string }>;

export type User = Entity<{
  name: string;
  entryCount: number;
}>;
