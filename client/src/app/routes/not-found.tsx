import { Anchor, Center, Group, Stack, Text, Title } from "@mantine/core";
import { IconBedFilled } from "@tabler/icons-react";

export function NotFoundRoute() {
  return (
    <Center mt="lg">
      <Stack align="center">
        <Title size={144} data-testid="not-found-title">
          404
        </Title>
        <Text data-testid="not-found-message">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Anchor href="/" c="orange" data-testid="not-found-link">
          <Group gap="xs">
            <IconBedFilled size={36} />
            <Text>Take me back to bed (home)</Text>
          </Group>
        </Anchor>
      </Stack>
    </Center>
  );
}
