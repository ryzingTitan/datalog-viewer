import CoolantTemperatureGauge from "./CoolantTemperatureGauge";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";
describe("Coolant Temperature Gauge", () => {
  it("should render coolant temperature gauge", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        coolantTemperature: 110,
      },
    } as Datalog;

    render(
      <CoolantTemperatureGauge datalogs={Array.of(datalog)} currentIndex={0} />,
    );

    expect(await screen.findByText("Coolant Temperature")).toBeInTheDocument();
    expect(await screen.findByText("110 \u00b0F")).toBeInTheDocument();
  });
});
