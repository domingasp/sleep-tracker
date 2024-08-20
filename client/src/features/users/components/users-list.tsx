import { Text } from "@mantine/core";
import {
  createMRTColumnHelper,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useUsers } from "../api/get-users";
import { User } from "../../../types/api";

export const UsersList = () => {
  const usersQuery = useUsers();
  const users = usersQuery.data;

  const columnHelper = createMRTColumnHelper<User>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("entryCount", {
      header: "Total Sleep Records",
    }),
  ];

  const table = useMantineReactTable({
    columns,
    data: users ?? [],
    getRowId: (row) => row.id,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => console.log(row, "clicked"),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: () => (
      <Text
        p="sm"
        fs="italic"
        size="sm"
        c="orange"
        data-testid="users-list-table-hint"
      >
        Click a row to see sleep history for the last 7 days
      </Text>
    ),
  });

  // TODO test this is rendered as part of landing.test.tsx
  return <MantineReactTable table={table} />;
};
