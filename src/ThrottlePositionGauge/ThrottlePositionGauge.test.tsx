import ThrottlePositionGauge from "./ThrottlePositionGauge";
import Datalog from "../Session/Datalog";
import { render, screen } from "@testing-library/react";
describe("Throttle Position Gauge", () => {
  it("should render throttle position gauge", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        throttlePosition: 65,
      },
    } as Datalog;

    render(
      <ThrottlePositionGauge datalogs={Array.of(datalog)} currentIndex={0} />,
    );

    expect(await screen.findByText("65%")).toBeInTheDocument();
  });
});
