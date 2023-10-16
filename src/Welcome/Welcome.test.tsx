import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome Component", () => {
  it("should render welcome page", () => {
    render(<Welcome />);

    expect(screen.getByRole("heading")).toHaveTextContent(
      /^Welcome to the Datalog Viewer!$/,
    );
    expect(screen.getByTitle("QueryStatsIcon")).toBeInTheDocument();
  });
});
