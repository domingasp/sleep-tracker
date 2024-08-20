import { getUsersQueryOptions } from "../../features/users/api/get-users";
import { QueryClient } from "@tanstack/react-query";
import { UsersList } from "../../features/users/components/users-list";
import { ContentLayout } from "../../components/layouts/content-layout";
import { Button } from "@mantine/core";
import { IconBedFilled } from "@tabler/icons-react";

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
    <ContentLayout
      topRightActions={
        <Button
          leftSection={<IconBedFilled />}
          variant="outline"
          color="orange"
          data-testid="landing-route-track-sleep-button"
        >
          Track Sleep
        </Button>
      }
    >
      <UsersList />
    </ContentLayout>
  );
}
