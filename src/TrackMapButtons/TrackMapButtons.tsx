import { ReactElement } from "react";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow, Replay } from "@mui/icons-material";
import TrackMapButtonsProps from "./TrackMapButtonsProps";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

export default function TrackMapButtons(
  trackMapButtonsProps: TrackMapButtonsProps,
): ReactElement {
  function playSession() {
    trackMapButtonsProps.setIsPlaying(true);
  }

  function pauseSession() {
    trackMapButtonsProps.setIsPlaying(false);
  }

  function restartSession() {
    trackMapButtonsProps.setCurrentIndex(0);
  }

  const handleChange = (event: SelectChangeEvent) => {
    trackMapButtonsProps.setPlaySpeed(event.target.value);
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} margin={2}>
      <IconButton onClick={restartSession}>
        <Replay />
      </IconButton>
      <IconButton onClick={pauseSession}>
        <Pause />
      </IconButton>
      <IconButton onClick={playSession}>
        <PlayArrow />
      </IconButton>
      <FormControl>
        <InputLabel>Speed</InputLabel>
        <Select
          value={trackMapButtonsProps.playSpeed.toString(10)}
          label="Speed"
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={0.5}>0.5x</MenuItem>
          <MenuItem value={1}>1x</MenuItem>
          <MenuItem value={2}>2x</MenuItem>
          <MenuItem value={4}>4x</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
