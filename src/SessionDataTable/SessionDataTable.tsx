import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import SessionDataTableProps from "./SessionDataTableProps";
import Datalog from "../Session/Datalog";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default function SessionDataTable(
  sessionDataTableProps: SessionDataTableProps
): React.ReactElement {
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
      width: 175,
    },
    {
      field: "coolantTemperature",
      headerName: "Coolant Temperature",
      headerAlign: "center",
      align: "center",
      width: 175,
    },
    {
      field: "engineRpm",
      headerName: "Engine RPM",
      headerAlign: "center",
      align: "center",
      width: 175,
    },
    {
      field: "speed",
      headerName: "Speed (MPH)",
      headerAlign: "center",
      align: "center",
      width: 175,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={sessionDataTableProps.datalogs}
        columns={columns}
        getRowId={(row: Datalog) => row.timestamp}
      />
    </div>
  );
}
