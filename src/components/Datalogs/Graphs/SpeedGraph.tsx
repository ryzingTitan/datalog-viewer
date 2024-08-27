import { ReactElement } from "react";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { format, parseISO } from "date-fns";
import { LineChart } from "@mui/x-charts";

export default function SpeedGraph(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const speedDataPoints = Array<number>();
  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    speedDataPoints.push(datalog.speed);
  });

  return (
    <LineChart
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
          valueFormatter: (value) => `${value} MPH`,
          showMark: false,
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
