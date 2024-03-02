import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import { LineChart } from "@mui/x-charts";

export default function TemperatureGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<Date>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    intakeTemperatureDataPoints.push(datalog.data.intakeAirTemperature);
    coolantTemperatureDataPoints.push(datalog.data.coolantTemperature);
  });

  return (
    <LineChart
      sx={{
        "& .MuiMarkElement-root": {
          display: "none",
        },
      }}
      legend={{ direction: "column" }}
      xAxis={[
        {
          data: labels,
          label: "Timestamp",
          scaleType: "time",
          tickMinStep: 300000,
          valueFormatter: (value: Date) => format(value, "h:mm a"),
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value: string) => `${value} \u2109`,
        },
      ]}
      series={[
        {
          data: intakeTemperatureDataPoints,
          label: "Intake Air Temperature",
          valueFormatter: (value: number) => `${value} \u2109`,
        },
        {
          data: coolantTemperatureDataPoints,
          label: "Coolant Temperature",
          valueFormatter: (value: number) => `${value} \u2109`,
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
    />
  );
}
