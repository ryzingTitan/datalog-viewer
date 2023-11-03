import Speedometer from "./Speedometer";
import Datalog from "../Session/Datalog";
import { render, screen } from "@testing-library/react";
describe("Speedometer", () => {
  it("should render speedometer", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        speed: 95,
      },
    } as Datalog;

    render(<Speedometer datalogs={Array.of(datalog)} currentIndex={0} />);

    expect(await screen.findByText("Speedometer")).toBeInTheDocument();
    expect(await screen.findByText("95 MPH")).toBeInTheDocument();
  });
});
