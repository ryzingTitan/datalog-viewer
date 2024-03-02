import { render, screen } from "@testing-library/react";
import ThrottleGraph from "./ThrottleGraph";
import {
  createMemoryRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Datalog from "../Session/Datalog";

describe("Throttle Graph Component", () => {
  it("should render throttle graph", async () => {
    let routes = Array<RouteObject>();
    let route = {
      path: "/sessions/:sessionId/throttle",
      element: <ThrottleGraph />,
      loader: () => testData(),
    } as RouteObject;
    routes.push(route);

    const router = createMemoryRouter(routes, {
      initialEntries: [
        "/sessions/047e2914-034d-4f86-9c04-d92c9867bbf0/throttle",
      ],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("Timestamp");

    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Throttle Position")).toBeInTheDocument();
    expect(screen.getByText("Engine RPM")).toBeInTheDocument();
    expect(screen.getByText("5000 RPM")).toBeInTheDocument();
    expect(screen.getByText("5500 RPM")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });
});

function testData(): Array<Datalog> {
  const firstDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      throttlePosition: 80,
      engineRpm: 5000,
    },
  } as Datalog;

  const secondDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      throttlePosition: 85,
      engineRpm: 5500,
    },
  } as Datalog;

  return Array.of(firstDatalog, secondDatalog);
}
