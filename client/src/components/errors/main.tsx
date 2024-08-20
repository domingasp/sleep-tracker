import { Button, Center, Stack, Title, useMantineTheme } from "@mantine/core";
import { IconAlarmSnoozeFilled, IconRefresh } from "@tabler/icons-react";

export function MainErrorFallback() {
  const theme = useMantineTheme();
  return (
    <Center mt={64}>
      <Stack align="center">
        <IconAlarmSnoozeFilled size={128} color={theme.colors.orange[6]} />
        <Title>Oops, something went wrong.</Title>
        <Button
          color="orange"
          leftSection={<IconRefresh />}
          variant="outline"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </Stack>
    </Center>
  );
}
