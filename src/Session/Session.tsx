import { ReactElement, useState } from "react";
import SessionDataTable from "../SessionDataTable/SessionDataTable";
import SessionMetadataSelect from "../SessionMetadataSelect/SessionMetadataSelect";
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
    <div>
      <SessionMetadataSelect
        selectedSessionId={selectedSessionId}
        setSessionId={setSessionId}
      />
      <SessionDataTable datalogs={datalogList} />
    </div>
  );
}
