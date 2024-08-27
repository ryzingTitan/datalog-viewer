import { ReactElement } from "react";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { format, parseISO } from "date-fns";
import { LineChart } from "@mui/x-charts";

export default function ThrottleGraph(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const engineRpmDataPoints = Array<number>();
  const throttlePositionDataPoints = Array<number>();
  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    engineRpmDataPoints.push(datalog.engineRpm);
    throttlePositionDataPoints.push(datalog.throttlePosition);
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
          id: "engineRpm",
          valueFormatter: (value: string) => `${value} RPM`,
        },
        {
          id: "throttlePosition",
          valueFormatter: (value: string) => `${value}%`,
        },
      ]}
      series={[
        {
          data: engineRpmDataPoints,
          label: "Engine RPM",
          valueFormatter: (value) => `${value} RPM`,
          yAxisId: "engineRpm",
          showMark: false,
        },
        {
          data: throttlePositionDataPoints,
          label: "Throttle Position",
          valueFormatter: (value) => `${value}%`,
          yAxisId: "throttlePosition",
          showMark: false,
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
