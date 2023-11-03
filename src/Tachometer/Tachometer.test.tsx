import Tachometer from "./Tachometer";
import Datalog from "../Session/Datalog";
import { render, screen } from "@testing-library/react";

describe("Tachometer", () => {
  it("should render tachometer", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        engineRpm: 4500,
      },
    } as Datalog;

    render(<Tachometer datalogs={Array.of(datalog)} currentIndex={0} />);

    expect(await screen.findByText("Tachometer")).toBeInTheDocument();
    expect(await screen.findByText("4500 RPM")).toBeInTheDocument();
  });
});
