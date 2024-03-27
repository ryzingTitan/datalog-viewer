import SessionMetadata from "../SessionMetadataSelect/SessionMetadata";

export default interface UploadDataSelectProps {
  uploadAction: string;
  sessionMetadataList: Array<SessionMetadata>;
  selectedSessionId: string;
  setSelectedSessionId: Function;
  setSelectedFile: Function;
}
