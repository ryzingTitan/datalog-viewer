import { ReactElement } from "react";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow } from "@mui/icons-material";
import TrackMapButtonsProps from "./TrackMapButtonsProps";

export default function TrackMapButtons(
  trackMapButtonsProps: TrackMapButtonsProps
): ReactElement {
  function playSession() {
    trackMapButtonsProps.setIsPlaying(true);
  }

  function pauseSession() {
    trackMapButtonsProps.setIsPlaying(false);
  }

  return (
    <Box>
      <IconButton onClick={playSession}>
        <PlayArrow />
      </IconButton>
      <IconButton onClick={pauseSession}>
        <Pause />
      </IconButton>
    </Box>
  );
}
