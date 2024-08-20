import "@testing-library/jest-dom";
import { render, screen } from "../../testing-utils";
import { LandingRoute } from "./landing";
import * as users from "../../features/users/api/get-users";

test("landing route must display the app name, a button for adding sleep, and user table", () => {
  jest.spyOn(users, "useUsers").mockReturnValue({
    data: [{ id: 1, name: "John", entryCount: 10 }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any); // TODO proper mocking of UseQueryResult

  render(<LandingRoute />);

  const titleElement = screen.getByTestId("content-layout-title");
  expect(titleElement).toHaveTextContent("Sleep Tracker");

  const trackSleepButtonElement = screen.getByTestId(
    "landing-route-add-sleep-button"
  );
  expect(trackSleepButtonElement).toHaveTextContent("Add Sleep");

  const tableHintElement = screen.getByTestId("users-list-table-hint");
  expect(tableHintElement).toHaveTextContent(
    "Click a row to see sleep history for the last 7 days"
  );

  // TODO check mantine react table rendered
});
