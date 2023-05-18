import {
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<SessionDataTable datalogs={[]} />}></Route>
      <Route
        path="/sessions/:sessionId/temperatures"
        element={<TemperatureGraph datalogs={[]} />}
      ></Route>
      <Route
        path="/sessions/:sessionId/boost"
        element={<BoostPressureGraph datalogs={[]} />}
      ></Route>
      <Route
        path="/sessions/:sessionId/throttle"
        element={<ThrottleGraph datalogs={[]} />}
      ></Route>
      <Route
        path="/sessions/:sessionId/speed"
        element={<SpeedGraph datalogs={[]} />}
      ></Route>
      <Route
        path="/sessions/:sessionId/map"
        element={<TrackMap datalogs={[]} />}
      ></Route>
    </Route>
  )
);

function Router(): ReactElement {
  return <RouterProvider router={router} />;
}

export default Router;
