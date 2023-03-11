import { Box } from "@mui/material";
import { ReactElement, useState } from "react";
import BoostPressureGraph from "../BoostPressureGraph/BoostPressureGraph";
import SessionDataTable from "../SessionDataTable/SessionDataTable";
import SessionMetadataSelect from "../SessionMetadataSelect/SessionMetadataSelect";
import SpeedGraph from "../SpeedGraph/SpeedGraph";
import TemperatureGraph from "../TemperatureGraph/TemperatureGraph";
import ThrottleGraph from "../ThrottleGraph/ThrottleGraph";
import TrackMap from "../TrackMap/TrackMap";
import Datalog from "./Datalog";
import SessionService from "./SessionService";

export default function Session(): ReactElement {
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [datalogList, setDatalogList] = useState(Array<Datalog>());

  function setSessionId(newSessionId: string) {
    const getSessionById = async (sessionId: string) => {
      const sessionService = new SessionService();
      const response = await sessionService.getDatalogsBySessionId(sessionId);
      setDatalogList(response.data);
    };

    if (newSessionId !== selectedSessionId) {
      getSessionById(newSessionId);
    }

    setSelectedSessionId(newSessionId);
  }

  return (
    <Box>
      <SessionMetadataSelect
        selectedSessionId={selectedSessionId}
        setSessionId={setSessionId}
      />
      <SessionDataTable datalogs={datalogList} />
      <TemperatureGraph datalogs={datalogList} />
      <BoostPressureGraph datalogs={datalogList} />
      <ThrottleGraph datalogs={datalogList} />
      <SpeedGraph datalogs={datalogList} />
      <TrackMap datalogs={datalogList} />
    </Box>
  );
}
