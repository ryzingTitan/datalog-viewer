import IntakeAirTemperatureGauge from "./IntakeAirTemperatureGauge";
import Datalog from "../Session/Datalog";
import { render, screen } from "@testing-library/react";
describe("Intake Air Temperature Gauge", () => {
  it("should render intake air temperature gauge", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        intakeAirTemperature: 130,
      },
    } as Datalog;

    render(
      <IntakeAirTemperatureGauge
        datalogs={Array.of(datalog)}
        currentIndex={0}
      />,
    );

    expect(await screen.findByText("130 \u00b0F")).toBeInTheDocument();
  });
});
