import Track from "../TrackEditor/Track";

export default interface UploadReviewProps {
  uploadAction: string;
  selectedSessionId: string | undefined;
  selectedFile: File | undefined;
  selectedTrack: Track | undefined;
}
