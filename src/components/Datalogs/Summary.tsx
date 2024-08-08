"use client";

import { ReactElement, useEffect, useState, useTransition } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import Datalog from "@/interfaces/Datalog";
import {
  closeSnackbar,
  enqueueSnackbar,
  SnackbarKey,
  SnackbarProvider,
} from "notistack";
import { IconButton } from "@mui/material";
import { Close, ErrorOutline } from "@mui/icons-material";
import theme from "@/theme";
import DatalogProps from "@/interfaces/DatalogProps";
import GetDatalogs from "@/actions/datalogs/GetDatalogs";

export default function Summary(datalogProps: DatalogProps): ReactElement {
  const [rows, setRows] = useState(Array<Datalog>);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        if (datalogProps.sessionId !== null) {
          setRows(await GetDatalogs(datalogProps.sessionId));
        }
      } catch (error: any) {
        setRows(Array());
        enqueueSnackbar(error.message, { variant: "error" });
      }
    });
  }, [datalogProps.sessionId]);

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
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={(row: Datalog) => row.timestamp}
        loading={isPending}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </>
  );
}

const columns: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Timestamp",
    flex: 1,
    headerAlign: "center",
    align: "center",
    valueFormatter: (value: string) => {
      const date = parseISO(value);
      return format(date, "MM-dd-yyyy h:mm:ss a");
    },
  },
  {
    field: "intakeAirTemperature",
    headerName: "Intake Air Temperature",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
  },
  {
    field: "boostPressure",
    headerName: "Boost Pressure (PSI)",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
  },
  {
    field: "coolantTemperature",
    headerName: "Coolant Temperature",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
  },
  {
    field: "engineRpm",
    headerName: "Engine RPM",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
  },
  {
    field: "speed",
    headerName: "Speed (MPH)",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
  {
    field: "throttlePosition",
    headerName: "Throttle Position",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
  },
  {
    field: "airFuelRatio",
    headerName: "AFR",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
  },
];
