import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";
import BoostPressureGraph from "./BoostPressureGraph";

describe("Boost Pressure Graph Component", () => {
  it("should render boost graph", async () => {
    let routes = Array<RouteObject>();
    let route = {
      path: "/sessions/:sessionId/boost",
      element: <BoostPressureGraph />,
      loader: () => testData(),
    } as RouteObject;
    routes.push(route);

    const router = createMemoryRouter(routes, {
      initialEntries: ["/sessions/047e2914-034d-4f86-9c04-d92c9867bbf0/boost"],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("Timestamp");

    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Boost Pressure")).toBeInTheDocument();
    expect(screen.getByText("12.5 PSI")).toBeInTheDocument();
    expect(screen.getByText("15 PSI")).toBeInTheDocument();
  });
});

function testData(): Array<Datalog> {
  const firstDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      boostPressure: 15,
    },
  } as Datalog;

  const secondDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      boostPressure: 12.5,
    },
  } as Datalog;

  return Array.of(firstDatalog, secondDatalog);
}
