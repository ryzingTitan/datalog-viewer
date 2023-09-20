import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";
import TemperatureGraph from "./TemperatureGraph";

describe("Temperature Graph Component", () => {
  it("should render temperature graph", async () => {
    let routes = Array<RouteObject>();
    let route = {
      path: "/sessions/:sessionId/temperatures",
      element: <TemperatureGraph />,
      loader: () => testData(),
    } as RouteObject;
    routes.push(route);

    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/sessions/047e2914-034d-4f86-9c04-d92c9867bbf0/temperatures",
      ],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("Timestamp");

    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Intake Air Temperature")).toBeInTheDocument();
    expect(screen.getByText("Coolant Temperature")).toBeInTheDocument();
    expect(screen.getByText("110 \u2109")).toBeInTheDocument();
    expect(screen.getByText("120 \u2109")).toBeInTheDocument();
    expect(screen.getByText("130 \u2109")).toBeInTheDocument();
    expect(screen.getByText("140 \u2109")).toBeInTheDocument();
  });
});

function testData(): Array<Datalog> {
  const firstDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      intakeAirTemperature: 130,
      coolantTemperature: 110,
    },
  } as Datalog;

  const secondDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      intakeAirTemperature: 140,
      coolantTemperature: 120,
    },
  } as Datalog;

  return Array.of(firstDatalog, secondDatalog);
}
