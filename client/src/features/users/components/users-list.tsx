import { Text } from "@mantine/core";
import {
  createMRTColumnHelper,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useUsers } from "../api/get-users";
import { User } from "../../../types/api";

type UsersListProps = {
  onClickRow: (value: User) => void;
};
export const UsersList = ({ onClickRow }: UsersListProps) => {
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
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => onClickRow(row.original),
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
