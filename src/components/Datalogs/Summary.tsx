"use client";

import { ReactElement } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import Datalog from "@/interfaces/Datalog";
import { closeSnackbar, SnackbarKey, SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import { Close, ErrorOutline } from "@mui/icons-material";
import theme from "@/theme";
import DatalogTabProps from "@/interfaces/DatalogTabProps";

export default function Summary(
  datalogTabProps: DatalogTabProps,
): ReactElement {
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
        rows={datalogTabProps.datalogs}
        columns={columns}
        getRowId={(row: Datalog) => row.timestamp}
        loading={datalogTabProps.isPending}
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
