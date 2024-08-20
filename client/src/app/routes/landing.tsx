import { Stack, Title } from "@mantine/core";
import { getUsersQueryOptions } from "../../features/users/api/get-users";
import { QueryClient } from "@tanstack/react-query";
import { UsersList } from "../../features/users/components/users-list";

// eslint-disable-next-line react-refresh/only-export-components
export const usersLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export function LandingRoute() {
  return (
    <Stack>
      <Title>Hello world!</Title>
      <UsersList />
    </Stack>
  );
}
