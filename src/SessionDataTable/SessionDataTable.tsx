import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import Datalog from "../Session/Datalog";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { ReactElement } from "react";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function SessionDataTable(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

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
      height={{}}
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
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
