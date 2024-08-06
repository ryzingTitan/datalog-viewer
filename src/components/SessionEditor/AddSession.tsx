"use client";

import { ReactElement, useCallback, useState } from "react";
import Track from "@/interfaces/Track";
import Car from "@/interfaces/Car";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Add, AttachFile, CloudUpload } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import CreateSession from "@/actions/session/CreateSession";
import AddSessionProps from "@/interfaces/AddSessionProps";

export default function AddSession(
  addSessionProps: AddSessionProps,
): ReactElement {
  const [open, setOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [carId, setCarId] = useState("");
  const [file, setFile] = useState<File>();

  const saveSession = async () => {
    try {
      const formData = new FormData();
      formData.append("carId", carId);
      formData.append("trackId", trackId);
      formData.append("uploadFile", file as File);

      await CreateSession(formData);
      handleClose();
      enqueueSnackbar("Session created successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleTrackChange = (event: SelectChangeEvent) => {
    setTrackId(event.target.value);
  };

  const handleCarChange = (event: SelectChangeEvent) => {
    setCarId(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTrackId("");
    setCarId("");
    setFile(undefined);
  };

  const onDrop = useCallback((selectedFiles: Array<File>) => {
    setFile(selectedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen} sx={{ margin: 2 }}>
        Add Session
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create New Session</DialogTitle>
        <DialogContent>
          <Stack spacing={2} padding={2}>
            <FormControl>
              <InputLabel>Track List</InputLabel>
              <Select
                id="track-select"
                value={trackId}
                label="Track List"
                onChange={handleTrackChange}
              >
                {addSessionProps.tracks.map((track: Track) => {
                  return (
                    <MenuItem key={track.id} value={track.id}>
                      {track.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Car List</InputLabel>
              <Select
                id="car-select"
                value={carId}
                label="Car List"
                onChange={handleCarChange}
              >
                {addSessionProps.cars.map((car: Car) => {
                  return (
                    <MenuItem key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Stack
              {...getRootProps()}
              alignItems="center"
              sx={{ border: "2px dashed grey", width: "100%" }}
              spacing={2}
              padding={2}
            >
              <CloudUpload sx={{ fontSize: 60 }} />
              <Button>
                Choose file to upload
                <input {...getInputProps()} />
              </Button>
              <Typography>Or drag and drop the file</Typography>
            </Stack>
          </Stack>
          <List>
            {file !== undefined ? (
              <ListItem key={file?.name}>
                <AttachFile />
                <ListItemText primary={file?.name}></ListItemText>
              </ListItem>
            ) : (
              <></>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveSession}>Save Session</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
