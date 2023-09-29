import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import { LineChart } from "@mui/x-charts";

export default function SpeedGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<Date>();
  const speedDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    speedDataPoints.push(datalog.data.speed);
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
          valueFormatter: (value: string) => `${value} MPH`,
        },
      ]}
      series={[
        {
          data: speedDataPoints,
          label: "Speed",
          valueFormatter: (value: number) => `${value} MPH`,
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
      margin={{ left: 60 }}
    />
  );
}
