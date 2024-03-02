import Dashboard from "./Dashboard";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";

describe("Dashboard", () => {
  it("should render dashboard", async () => {
    const datalog = {
      sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
      timestamp: new Date().toISOString(),
      data: {
        intakeAirTemperature: 130,
        coolantTemperature: 110,
        speed: 95,
        throttlePosition: 55,
        boostPressure: 15.5,
        engineRpm: 4500,
        airFuelRatio: 15.2,
      },
    } as Datalog;

    render(<Dashboard datalogs={Array.of(datalog)} currentIndex={0} />);

    expect(await screen.findByText("Coolant Temperature")).toBeInTheDocument();
    expect(await screen.findByText("130 \u00b0F")).toBeInTheDocument();
    expect(
      await screen.findByText("Intake Air Temperature"),
    ).toBeInTheDocument();
    expect(await screen.findByText("110 \u00b0F")).toBeInTheDocument();
    expect(await screen.findByText("Speedometer")).toBeInTheDocument();
    expect(await screen.findByText("95 MPH")).toBeInTheDocument();
    expect(await screen.findByText("Throttle Position")).toBeInTheDocument();
    expect(await screen.findByText("55%")).toBeInTheDocument();
    expect(await screen.findByText("Boost Pressure")).toBeInTheDocument();
    expect(await screen.findByText("15.5 PSI")).toBeInTheDocument();
    expect(await screen.findByText("Tachometer")).toBeInTheDocument();
    expect(await screen.findByText("4500 RPM")).toBeInTheDocument();
    expect(await screen.findByText("AFR")).toBeInTheDocument();
    expect(await screen.findByText("15.2")).toBeInTheDocument();
  });
});
