import Track from "../TrackEditor/Track";
import SessionMetadata from "../SessionMetadataSelect/SessionMetadata";

export default interface SessionUploadData {
  tracks: Array<Track>;
  sessionMetadataList: Array<SessionMetadata>;
}
