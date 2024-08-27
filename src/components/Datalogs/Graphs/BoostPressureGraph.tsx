import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { LineChart } from "@mui/x-charts";

export default function BoostPressureGraph(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const boostPressureDataPoints = Array<number>();
  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    boostPressureDataPoints.push(datalog.boostPressure);
  });

  return (
    <LineChart
      loading={datalogTabProps.isPending}
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
          valueFormatter: (value) => `${value} PSI`,
          showMark: false,
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
    />
  );
}
