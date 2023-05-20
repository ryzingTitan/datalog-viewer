import {
  Params,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ReactElement } from "react";
import Root from "./Root/Root";
import TemperatureGraph from "../TemperatureGraph/TemperatureGraph";
import SessionDataTable from "../SessionDataTable/SessionDataTable";
import BoostPressureGraph from "../BoostPressureGraph/BoostPressureGraph";
import ThrottleGraph from "../ThrottleGraph/ThrottleGraph";
import SpeedGraph from "../SpeedGraph/SpeedGraph";
import TrackMap from "../TrackMap/TrackMap";
import SessionService from "../Session/SessionService";

const sessionService = new SessionService();

const datalogsLoader = async function (params: Params<string>) {
  const response = await sessionService.getDatalogsBySessionId(
    params.sessionId as string
  );
  return response.data;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path="/sessions/:sessionId/summary"
        element={<SessionDataTable />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
      <Route
        path="/sessions/:sessionId/temperatures"
        element={<TemperatureGraph />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
      <Route
        path="/sessions/:sessionId/boost"
        element={<BoostPressureGraph />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
      <Route
        path="/sessions/:sessionId/throttle"
        element={<ThrottleGraph />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
      <Route
        path="/sessions/:sessionId/speed"
        element={<SpeedGraph />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
      <Route
        path="/sessions/:sessionId/map"
        element={<TrackMap />}
        loader={async ({ params }) => datalogsLoader(params)}
      ></Route>
    </Route>
  )
);

export default function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
