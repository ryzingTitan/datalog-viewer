import SessionMetadata from "../SessionMetadataSelect/SessionMetadata";

export default interface UploadDataSelectProps {
  uploadType: string;
  sessionMetadataList: Array<SessionMetadata>;
  selectedSessionId: string;
  setSelectedSessionId: Function;
  setSelectedFile: Function;
}
