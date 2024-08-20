import { Drawer, Text, useMantineTheme } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import dayjs from "dayjs";
import { User } from "../../../types/api";
import { useRecentSleepRecords } from "../api/get-recent-sleep-records";
import { RechartTooltip } from "../../../components/ui/recharts-tooltip";

type RecentSleepRecordsDrawerProps = {
  user: User;
  opened: boolean;
  close: () => void;
};
export function RecentSleepRecordsDrawer({
  user,
  opened,
  close,
}: RecentSleepRecordsDrawerProps) {
  const theme = useMantineTheme();
  const recentSleepRecordsQuery = useRecentSleepRecords({
    userId: user?.id,
  });

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={
        <Text fw={theme.headings.fontWeight} style={theme.headings.sizes.h2}>
          Recorded sleep in the last 7 days for{" "}
          <Text
            span
            c="orange"
            fw={theme.headings.fontWeight}
            style={theme.headings.sizes.h2}
          >
            {user.name}
          </Text>
        </Text>
      }
      position="bottom"
    >
      <BarChart
        h={350}
        p="lg"
        pt="lg"
        data={recentSleepRecordsQuery.data ?? []}
        dataKey="date"
        series={[{ name: "hoursSlept", label: "Hours Slept", color: "orange" }]}
        xAxisProps={{
          tickFormatter: (value) => dayjs(value).format("DD/MM/YYYY"),
        }}
        yAxisProps={{ domain: [0, 24] }}
        tooltipAnimationDuration={200}
        tooltipProps={{
          content: ({ label, payload }) => (
            <RechartTooltip
              label={dayjs(label).format("DD/MM/YYYY")}
              payload={payload}
              nameToLabelMapping={{ hoursSlept: "Hours Slept" }}
            />
          ),
        }}
        barProps={{ radius: 10 }}
        referenceLines={[
          {
            y: 7,
            color: "gray.1",
            label: "Recommended Minimum",
            labelPosition: "insideTopRight",
          },
        ]}
      />
    </Drawer>
  );
}
