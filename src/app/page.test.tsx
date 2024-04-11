import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page Component", () => {
  it("should render page", () => {
    render(<Page />);

    expect(screen.getByRole("heading")).toHaveTextContent(
      /^Welcome to the Datalog Viewer!$/,
    );
    expect(screen.getByTitle("Query Stats Icon")).toBeInTheDocument();
  });
});
