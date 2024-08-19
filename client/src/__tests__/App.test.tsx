import { render, screen } from "../testing-utils";
import App from "../App";

test('renders "Sleep Tracker" in a h1 tag', () => {
  render(<App />);
  const titleElement = screen.getByTestId("sleep-tracker-title");

  expect(titleElement.tagName).toBe("H1");
  expect(titleElement.innerHTML).toBe("Sleep Tracker");
});
