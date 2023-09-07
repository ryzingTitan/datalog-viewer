import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Datalog from "../Session/Datalog";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { ReactElement } from "react";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function SessionDataTable(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: 1,
      }}
    >
      <DataGrid
        autoHeight
        rows={datalogs}
        columns={columns}
        getRowId={(row: Datalog) => row.timestamp}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

const columns: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Timestamp",
    flex: 1,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      const date = parseISO(params.value);
      return format(date, "MM-dd-yyyy h:mm:ss a");
    },
  },
  {
    field: "intakeAirTemperature",
    headerName: "Intake Air Temperature",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.intakeAirTemperature,
  },
  {
    field: "boostPressure",
    headerName: "Boost Pressure (PSI)",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.boostPressure,
  },
  {
    field: "coolantTemperature",
    headerName: "Coolant Temperature",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.coolantTemperature,
  },
  {
    field: "engineRpm",
    headerName: "Engine RPM",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.engineRpm,
  },
  {
    field: "speed",
    headerName: "Speed (MPH)",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.speed,
  },
  {
    field: "throttlePosition",
    headerName: "Throttle Position",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.throttlePosition,
  },
  {
    field: "airFuelRatio",
    headerName: "AFR",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    valueGetter: (params: GridValueGetterParams<Datalog>) =>
      params.row.data.airFuelRatio,
  },
];
