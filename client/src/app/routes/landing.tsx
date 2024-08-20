import { getUsersQueryOptions } from "../../features/users/api/get-users";
import { QueryClient } from "@tanstack/react-query";
import { UsersList } from "../../features/users/components/users-list";
import { ContentLayout } from "../../components/layouts/content-layout";
import { Button } from "@mantine/core";
import { IconBedFilled } from "@tabler/icons-react";
import { useState } from "react";
import { RecentSleepRecordsDrawer } from "../../features/users/components/recent-sleep-records-drawer";
import { User } from "../../types/api";
import { useDisclosure } from "@mantine/hooks";

// eslint-disable-next-line react-refresh/only-export-components
export const usersLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export function LandingRoute() {
  const [clickedUser, setClickedUser] = useState<User | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);

  const onClickUserRow = (user: User) => {
    setClickedUser(user);
    open();
  };

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
      <UsersList onClickRow={onClickUserRow} />
      {clickedUser && (
        <RecentSleepRecordsDrawer
          user={clickedUser}
          opened={opened}
          close={close}
        />
      )}
    </ContentLayout>
  );
}
