import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Datalog from "../Session/Datalog";
import SpeedGraph from "./SpeedGraph";

describe("Speed Graph Component", () => {
  it("should render speed graph", async () => {
    let routes = Array<RouteObject>();
    let route = {
      path: "/sessions/:sessionId/speed",
      element: <SpeedGraph />,
      loader: () => testData(),
    } as RouteObject;
    routes.push(route);

    const router = createMemoryRouter(routes, {
      initialEntries: ["/sessions/047e2914-034d-4f86-9c04-d92c9867bbf0/speed"],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("Timestamp");

    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
    expect(screen.getByText("55 MPH")).toBeInTheDocument();
    expect(screen.getByText("60 MPH")).toBeInTheDocument();
  });
});

function testData(): Array<Datalog> {
  const firstDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      speed: 55,
    },
  } as Datalog;

  const secondDatalog = {
    sessionId: "047e2914-034d-4f86-9c04-d92c9867bbf0",
    timestamp: new Date().toISOString(),
    data: {
      speed: 60,
    },
  } as Datalog;

  return Array.of(firstDatalog, secondDatalog);
}
