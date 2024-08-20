/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Divider, Group, Paper, Stack, Text } from "@mantine/core";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  nameToLabelMapping: { [key: string]: string };
}

export function RechartTooltip({
  label,
  payload,
  nameToLabelMapping,
}: ChartTooltipProps) {
  if (!payload) return null;
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      <Stack gap={4}>
        <Text size="md" fw={500} ta="center">
          {label}
        </Text>
        <Divider />
        {payload.map((item: any) => (
          <Group key={item.name} justify="space-between">
            <Box
              w={16}
              h={16}
              bg={item.color}
              style={{ borderRadius: "100%" }}
            />
            <Text>{nameToLabelMapping[item.name]}</Text>
            <Text fw="bold" size="lg" c="white">
              {item.value}
            </Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
