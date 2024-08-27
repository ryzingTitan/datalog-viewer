import { format, parseISO } from "date-fns";
import { LineChart } from "@mui/x-charts";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { ReactElement } from "react";

export default function TemperatureGraph(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    intakeTemperatureDataPoints.push(datalog.intakeAirTemperature);
    coolantTemperatureDataPoints.push(datalog.coolantTemperature);
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
          valueFormatter: (value: string) => `${value} \u2109`,
        },
      ]}
      series={[
        {
          data: intakeTemperatureDataPoints,
          label: "Intake Air Temperature",
          valueFormatter: (value) => `${value} \u2109`,
          showMark: false,
        },
        {
          data: coolantTemperatureDataPoints,
          label: "Coolant Temperature",
          valueFormatter: (value) => `${value} \u2109`,
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
