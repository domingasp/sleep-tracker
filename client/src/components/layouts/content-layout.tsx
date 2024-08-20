import { Box, Group, Stack, Title, useMantineTheme } from "@mantine/core";
import { IconMoonStars } from "@tabler/icons-react";

type ContentLayoutProps = {
  children: React.ReactNode;
  topRightActions?: React.ReactNode;
};

export function ContentLayout({
  children,
  topRightActions,
}: ContentLayoutProps) {
  const theme = useMantineTheme();
  return (
    <Stack gap={0}>
      <Group
        justify="space-between"
        p="lg"
        style={{
          boxShadow: theme.shadows.lg,
        }}
      >
        <Group align="center" gap="sm">
          <IconMoonStars size={48} color={theme.colors.orange[6]} />
          <Title size={28} data-testid="content-layout-title">
            Sleep Tracker
          </Title>
        </Group>

        <Box flex={1} ta="right">
          {topRightActions}
        </Box>
      </Group>
      <Box p="lg">{children}</Box>
    </Stack>
  );
}
