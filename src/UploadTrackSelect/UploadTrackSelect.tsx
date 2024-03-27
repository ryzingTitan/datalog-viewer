import { ReactElement } from "react";
import TrackPreview from "../TrackPreview/TrackPreview";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import UploadTrackSelectProps from "./UploadTrackSelectProps";
import Track from "../TrackEditor/Track";

function sortByTrackName(firstTrack: Track, secondTrack: Track): number {
  return firstTrack.name.toLowerCase() < secondTrack.name.toLowerCase()
    ? -1
    : 1;
}

export default function UploadTrackSelect(
  uploadTrackSelectProps: UploadTrackSelectProps,
): ReactElement {
  const handleChange = (event: SelectChangeEvent) => {
    const trackId = event.target.value;
    uploadTrackSelectProps.setSelectedTrack(
      uploadTrackSelectProps.tracks.find(
        (track: Track) => track.id === trackId,
      ),
    );
  };

  return (
    <Stack direction="row">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tracks</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={uploadTrackSelectProps.selectedTrack?.id ?? ""}
          label="Tracks"
          onChange={handleChange}
        >
          {uploadTrackSelectProps.tracks
            .sort(sortByTrackName)
            .map((track: Track) => {
              return (
                <MenuItem key={track.id} value={track.id}>
                  {track.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <TrackPreview
        latitude={uploadTrackSelectProps.selectedTrack?.latitude ?? 0}
        longitude={uploadTrackSelectProps.selectedTrack?.longitude ?? 0}
        iconSize={"large"}
      />
    </Stack>
  );
}
