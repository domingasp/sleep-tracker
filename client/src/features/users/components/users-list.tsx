import { useUsers } from "../api/get-users";

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return <div>loading users...</div>;
  } else if (usersQuery.isError) {
    throw new Error(usersQuery.error.message);
  }

  const users = usersQuery.data;

  return <div>Users: {users?.length}</div>;
};
