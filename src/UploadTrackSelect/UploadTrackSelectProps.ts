import Track from "../TrackEditor/Track";

export default interface UploadTrackSelectProps {
  tracks: Array<Track>;
  selectedTrack: Track | undefined;
  setSelectedTrack: Function;
}
