import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error Component", () => {
  it("should render error page", () => {});
  render(<Error />);

  expect(
    screen.getByText("An unexpected error has occurred."),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Please ensure a valid session has been selected and reload the page.",
    ),
  ).toBeInTheDocument();
});
