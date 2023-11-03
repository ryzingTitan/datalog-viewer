import BoostPressureGauge from "./BoostPressureGauge";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";

describe("Boost Pressure Gauge", () => {
  it("should render boost gauge", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        boostPressure: 15,
      },
    } as Datalog;

    render(
      <BoostPressureGauge datalogs={Array.of(datalog)} currentIndex={0} />,
    );

    expect(await screen.findByText("Boost Pressure")).toBeInTheDocument();
    expect(await screen.findByText("15 PSI")).toBeInTheDocument();
  });
});
