import "@testing-library/jest-dom";
import { render, screen } from "../../testing-utils";
import { NotFoundRoute } from "./not-found";

test("not found route has a clear message and a link taking user back to root /", () => {
  render(<NotFoundRoute />);

  const titleElement = screen.getByTestId("not-found-title");
  expect(titleElement.tagName).toBe("H1");
  expect(titleElement).toHaveTextContent("404");

  const messageElement = screen.getByTestId("not-found-message");
  expect(messageElement).toHaveTextContent(
    "Sorry, the page you are looking for does not exist."
  );

  const linkElement = screen.getByTestId("not-found-link");
  expect(linkElement).toHaveAttribute("href", "/");
  expect(linkElement).toHaveTextContent("Take me back to bed (home)");
});
