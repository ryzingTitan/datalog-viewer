import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import { LineChart } from "@mui/x-charts";

export default function ThrottleGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<Date>();
  const engineRpmDataPoints = Array<number>();
  const throttlePositionDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    engineRpmDataPoints.push(datalog.data.engineRpm);
    throttlePositionDataPoints.push(datalog.data.throttlePosition);
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
          id: "engineRpm",
          valueFormatter: (value: string) => `${value} RPM`,
        },
        {
          id: "throttlePosition",
          valueFormatter: (value: string) => `${value} %`,
        },
      ]}
      series={[
        {
          data: engineRpmDataPoints,
          label: "Engine RPM",
          valueFormatter: (value: number) => `${value} RPM`,
          yAxisKey: "engineRpm",
        },
        {
          data: throttlePositionDataPoints,
          label: "Throttle Position",
          valueFormatter: (value: number) => `${value} %`,
          yAxisKey: "throttlePosition",
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
      margin={{ left: 70 }}
      rightAxis="throttlePosition"
    />
  );
}
