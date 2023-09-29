import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import { LineChart } from "@mui/x-charts";

export default function BoostPressureGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<Date>();
  const boostPressureDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    boostPressureDataPoints.push(datalog.data.boostPressure);
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
          valueFormatter: (value: string) => `${value} PSI`,
        },
      ]}
      series={[
        {
          data: boostPressureDataPoints,
          label: "Boost Pressure",
          valueFormatter: (value: number) => `${value} PSI`,
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
    />
  );
}
