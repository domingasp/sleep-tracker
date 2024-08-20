import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { Gender } from "../../../types/api";
import { QueryConfig } from "../../../lib/react-query";

export const getGenders = (): Promise<Gender[]> => {
  return api.get(`/genders`);
};

export const getGendersQueryOptions = () => {
  return queryOptions({
    queryKey: ["genders"],
    queryFn: getGenders,
  });
};

type UseGendersOptions = {
  queryConfig?: QueryConfig<typeof getGendersQueryOptions>;
};

export const useGenders = ({ queryConfig }: UseGendersOptions = {}) => {
  return useQuery({
    ...getGendersQueryOptions(),
    ...queryConfig,
  });
};
