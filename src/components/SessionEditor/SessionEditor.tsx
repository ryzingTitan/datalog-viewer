"use client";

import {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import {
  closeSnackbar,
  enqueueSnackbar,
  SnackbarKey,
  SnackbarProvider,
} from "notistack";
import {
  AttachFile,
  Close,
  CloudUpload,
  ErrorOutline,
  UploadFile,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
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
import theme from "@/theme";
import { Session } from "@/interfaces/Session";
import GetSessions from "@/actions/sessions/GetSessions";
import AddSession from "@/components/SessionEditor/AddSession";
import { format, parseISO } from "date-fns";
import Track from "@/interfaces/Track";
import Car from "@/interfaces/Car";
import { useDropzone } from "react-dropzone";
import GetTracks from "@/actions/tracks/GetTracks";
import GetCars from "@/actions/cars/GetCars";
import UpdateSession from "@/actions/sessions/UpdateSession";

const formatDateTime = (dateTime: string): string => {
  const date = parseISO(dateTime);
  return format(date, "MM-dd-yyyy h:mm a");
};

export default function SessionEditor(): ReactElement {
  const [rows, setRows] = useState(Array<Session>);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [tracks, setTracks] = useState(Array<Track>);
  const [carId, setCarId] = useState("");
  const [cars, setCars] = useState(Array<Car>);
  const [file, setFile] = useState<File>();
  const [sessionId, setSessionId] = useState(0);

  const updateSession = async () => {
    try {
      const formData = new FormData();
      formData.append("carId", carId);
      formData.append("trackId", trackId);
      formData.append("uploadFile", file as File);

      await UpdateSession(formData, sessionId);
      handleClose();
      enqueueSnackbar("Session updated successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar("Failed to update session", { variant: "error" });
    }
  };

  const handleTrackChange = (event: SelectChangeEvent) => {
    setTrackId(event.target.value);
  };

  const handleCarChange = (event: SelectChangeEvent) => {
    setCarId(event.target.value);
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

  useEffect(() => {
    startTransition(async () => {
      try {
        setRows(await GetSessions());
      } catch (error: any) {
        setRows(Array());
        enqueueSnackbar("Failed to get sessions", { variant: "error" });
      }
      try {
        setTracks(await GetTracks());
      } catch (error: any) {
        setTracks(Array());
        enqueueSnackbar("Failed to get tracks", { variant: "error" });
      }

      try {
        setCars(await GetCars());
      } catch (error: any) {
        setCars(Array());
        enqueueSnackbar("Failed to get cars", { variant: "error" });
      }
    });
  }, []);

  const handleUpdateClick = (id: GridRowId) => () => {
    const updatedRow = rows.find((row) => row.id === id);
    setSessionId(updatedRow?.id ?? 0);

    const track = tracks.find((track) => track.name === updatedRow?.trackName);
    setTrackId(track?.id.toString() ?? "");

    const car = cars.find(
      (car) =>
        car.year === updatedRow?.carYear &&
        car.make === updatedRow.carMake &&
        car.model === updatedRow.carModel,
    );
    setCarId(car?.id.toString() ?? "");

    setOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "startTime",
      headerName: "Start Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (value) => formatDateTime(value),
    },
    {
      field: "endTime",
      headerName: "End Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (value) => formatDateTime(value),
    },
    {
      field: "trackName",
      headerName: "Track Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "carYear",
      headerName: "Car Year",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (value?: number) => value?.toString(),
    },
    {
      field: "carMake",
      headerName: "Car Make",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "carModel",
      headerName: "Car Model",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key="Update"
            icon={<UploadFile />}
            label="Update"
            className="textPrimary"
            onClick={handleUpdateClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        action={(snackbarId: SnackbarKey) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(snackbarId)}>
            <Close />
          </IconButton>
        )}
        preventDuplicate={true}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        iconVariant={{
          error: (
            <ErrorOutline
              color="inherit"
              sx={{ paddingRight: 2 }}
              fontSize="large"
            />
          ),
        }}
        style={{ fontFamily: theme.typography.fontFamily }}
      />
      <AddSession cars={cars} tracks={tracks} />
      <DataGrid
        sx={{ margin: 2 }}
        autoHeight
        rows={rows}
        columns={columns}
        loading={isPending}
      />
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Update Session</DialogTitle>
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
                {tracks.map((track: Track) => {
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
                {cars.map((car: Car) => {
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
          <Button onClick={updateSession}>Update Session</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
