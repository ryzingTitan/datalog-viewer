import {
  Params,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ReactElement } from "react";
import Home from "../Home/Home";
import TemperatureGraph from "../TemperatureGraph/TemperatureGraph";
import SessionDataTable from "../SessionDataTable/SessionDataTable";
import BoostPressureGraph from "../BoostPressureGraph/BoostPressureGraph";
import ThrottleGraph from "../ThrottleGraph/ThrottleGraph";
import SpeedGraph from "../SpeedGraph/SpeedGraph";
import TrackMap from "../TrackMap/TrackMap";
import SessionService from "../Session/SessionService";
import Welcome from "../Welcome/Welcome";
import Error from "../Error/Error";
import { useAuth0 } from "@auth0/auth0-react";
import TrackEditor from "../TrackEditor/TrackEditor";
import TrackService from "../TrackEditor/TrackService";
import SessionUpload from "../SessionUpload/SessionUpload";
import SessionMetadataService from "../SessionMetadataSelect/SessionMetadataService";
import SessionUploadData from "../SessionUpload/SessionUploadData";

const sessionService = new SessionService();
const trackService = new TrackService();
const sessionMetadataService = new SessionMetadataService();

function Router(): ReactElement {
  const { getAccessTokenSilently, user } = useAuth0();

  const datalogsLoader = async function (params: Params<string>) {
    const accessToken = await getAccessTokenSilently();

    const response = await sessionService.getDatalogsBySessionId(
      params.sessionId as string,
      accessToken,
    );
    return response.data;
  };

  const tracksLoader = async function () {
    const accessToken = await getAccessTokenSilently();
    const response = await trackService.getAll(accessToken);
    return response.data;
  };

  const sessionUploadDataLoader = async function () {
    const accessToken = await getAccessTokenSilently();
    const trackResponse = trackService.getAll(accessToken);
    const sessionMetadataResponse =
      sessionMetadataService.getAllSessionMetadata(
        user?.email ?? "",
        accessToken,
      );

    const [trackResponseResult, sessionMetadataResponseResult] =
      await Promise.all([trackResponse, sessionMetadataResponse]);

    const sessionUploadData = {} as SessionUploadData;
    sessionUploadData.tracks = trackResponseResult.data;
    sessionUploadData.sessionMetadataList = sessionMetadataResponseResult.data;
    return sessionUploadData;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />} errorElement={<Error />}>
        <Route errorElement={<Error />}>
          <Route index element={<Welcome />} />
          <Route
            path="/sessions/:sessionId/summary"
            element={<SessionDataTable disableVirtualization={false} />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path="/sessions/:sessionId/temperatures"
            element={<TemperatureGraph />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path="/sessions/:sessionId/boost"
            element={<BoostPressureGraph />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path="/sessions/:sessionId/throttle"
            element={<ThrottleGraph />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path="/sessions/:sessionId/speed"
            element={<SpeedGraph />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path="/sessions/:sessionId/map"
            element={<TrackMap />}
            loader={async ({ params }) => datalogsLoader(params)}
          />
          <Route
            path={"/track-editor"}
            element={<TrackEditor />}
            loader={async () => tracksLoader()}
          />
          <Route
            path={"/session-upload"}
            element={<SessionUpload />}
            loader={async () => sessionUploadDataLoader()}
          />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default Router;
