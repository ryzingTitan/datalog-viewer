import SessionMetadataService from "./SessionMetadataService";

export default interface SessionMetadataSelectProps {
  selectedSessionId: string;
  setSessionId: Function;
  sessionMetadataService: SessionMetadataService;
}
