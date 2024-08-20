import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { SleepRecord } from "../../../types/api";
import { QueryConfig } from "../../../lib/react-query";

export type GetRecentSleepRecordsDto = {
  userId: number;
};

export const getRecentSleepRecords = ({
  userId,
}: GetRecentSleepRecordsDto): Promise<SleepRecord[]> => {
  if (userId <= 0) return Promise.resolve([]);
  return api.get(`/users/${userId}/recent-sleep-records`);
};

export const getRecentSleepRecordsQueryOptions = (userId: number) => {
  return queryOptions({
    queryKey: ["user-get-recent-sleep-records", userId],
    queryFn: () => getRecentSleepRecords({ userId }),
  });
};

type UseRecentSleepRecordsOptions = {
  userId: number;
  queryConfig?: QueryConfig<typeof getRecentSleepRecordsQueryOptions>;
};

export const useRecentSleepRecords = ({
  userId,
  queryConfig,
}: UseRecentSleepRecordsOptions) => {
  return useQuery({
    ...getRecentSleepRecordsQueryOptions(userId),
    ...queryConfig,
  });
};
