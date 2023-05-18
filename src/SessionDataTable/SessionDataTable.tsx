import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import SessionDataTableProps from "./SessionDataTableProps";
import Datalog from "../Session/Datalog";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { ReactElement } from "react";
import { Box } from "@mui/material";

export default function SessionDataTable(
  sessionDataTableProps: SessionDataTableProps
): ReactElement {
  const columns: GridColDef[] = [
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 200,
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
      width: 175,
    },
    {
      field: "boostPressure",
      headerName: "Boost Pressure (PSI)",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "coolantTemperature",
      headerName: "Coolant Temperature",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "engineRpm",
      headerName: "Engine RPM",
      headerAlign: "center",
      align: "center",
      width: 125,
    },
    {
      field: "speed",
      headerName: "Speed (MPH)",
      headerAlign: "center",
      align: "center",
      width: 125,
    },
    {
      field: "throttlePosition",
      headerName: "Throttle Position",
      headerAlign: "center",
      align: "center",
      width: 125,
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        paddingTop: 1,
      }}
    >
      <DataGrid
        rows={sessionDataTableProps.datalogs}
        columns={columns}
        getRowId={(row: Datalog) => row.timestamp}
      />
    </Box>
  );
}
