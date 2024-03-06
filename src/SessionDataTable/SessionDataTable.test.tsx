import Datalog from "../Session/Datalog";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import SessionDataTable from "./SessionDataTable";

describe("Session Data Table", () => {
  it("should render session data table", async () => {
    let routes = Array<RouteObject>();
    let route = {
      path: "/sessions/:sessionId/summary",
      element: <SessionDataTable disableVirtualization={true} />,
      loader: () => testData(),
    } as RouteObject;
    routes.push(route);

    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/sessions/047e2914-034d-4f86-9c04-d92c9867bbf0/summary",
      ],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Timestamp")).toBeInTheDocument();
    expect(
      await screen.findByText("Intake Air Temperature"),
    ).toBeInTheDocument();
    expect(await screen.findByText("130")).toBeInTheDocument();
    expect(await screen.findByText("Coolant Temperature")).toBeInTheDocument();
    expect(await screen.findByText("110")).toBeInTheDocument();
    expect(await screen.findByText("Speed (MPH)")).toBeInTheDocument();
    expect(await screen.findByText("95")).toBeInTheDocument();
    expect(await screen.findByText("Throttle Position")).toBeInTheDocument();
    expect(await screen.findByText("55")).toBeInTheDocument();
    expect(await screen.findByText("Boost Pressure (PSI)")).toBeInTheDocument();
    expect(await screen.findByText("15.5")).toBeInTheDocument();
    expect(await screen.findByText("Engine RPM")).toBeInTheDocument();
    expect(await screen.findByText("4500")).toBeInTheDocument();
    expect(await screen.findByText("AFR")).toBeInTheDocument();
    expect(await screen.findByText("15.2")).toBeInTheDocument();
  });
});

function testData(): Array<Datalog> {
  const firstDatalog = {
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

  return Array.of(firstDatalog);
}
