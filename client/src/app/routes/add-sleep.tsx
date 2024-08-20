import { Button } from "@mantine/core";
import { ContentLayout } from "../../components/layouts/content-layout";
import { IconHomeFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CreateSleepRecord } from "../../features/sleep-records/components/create-sleep-record";

export function AddSleepRoute() {
  const navigate = useNavigate();

  return (
    <ContentLayout
      topRightActions={
        <Button
          leftSection={<IconHomeFilled size={22} />}
          variant="outline"
          color="orange"
          data-testid="landing-route-add-sleep-button"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      }
    >
      <CreateSleepRecord />
    </ContentLayout>
  );
}
