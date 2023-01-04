import React from "react";
import { ReactElement } from "react";
import IntakeAirTemperatureGraph from "../IntakeAirTemperatureGraph/IntakeAirTemperatureGraph";
import SessionMetadataSelect from "../SessionMetadataSelect/SessionMetadataSelect";
import SessionMetadataService from "../SessionMetadataSelect/SessionMetadataService";
import Datalog from "./Datalog";
import SessionService from "./SessionService";

export default function Session(): ReactElement {
  const [selectedSessionId, setSelectedSessionId] = React.useState("");
  // const [datalogList, setDatalogList] = React.useState(Array<Datalog>())
  const sessionMetadataService = new SessionMetadataService();

  const setSessionId = (newSessionId: string) => {
    const getSessionById = async (sessionId: string) => {
      const sessionService = new SessionService();
      const response = await sessionService.getDatalogsBySessionId(sessionId);
      // setDatalogList(response.data)
    };

    if (newSessionId !== selectedSessionId) {
      getSessionById(newSessionId);
    }

    setSelectedSessionId(newSessionId);
  };

  return (
    <div>
      <SessionMetadataSelect
        selectedSessionId={selectedSessionId}
        setSessionId={setSessionId}
        sessionMetadataService={sessionMetadataService}
      />
      {/* <IntakeAirTemperatureGraph datalogs={datalogList} sessionId={selectedSessionId} /> */}
    </div>
  );
}