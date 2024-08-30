import { format, parseISO } from "date-fns";
import { BarChart, LineChart } from "@mui/x-charts";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { ReactElement } from "react";

export default function TemperatureGraphs(
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

  const getBucketSize = (
    low: number,
    high: number,
    dataPoints: Array<number>,
  ): number => {
    let count = 0;

    dataPoints.forEach((dataPoint) => {
      if (dataPoint >= low && dataPoint <= high) {
        count += 1;
      }
    });

    return count;
  };

  return (
    <>
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
            label: "Intake Air Temperature (\u2109)",
            valueFormatter: (value) => `${value} \u2109`,
            showMark: false,
          },
          {
            data: coolantTemperatureDataPoints,
            label: "Coolant Temperature (\u2109)",
            valueFormatter: (value) => `${value} \u2109`,
            showMark: false,
          },
        ]}
        tooltip={{
          trigger: "axis",
        }}
        height={400}
      />

      <BarChart
        xAxis={[
          {
            label: "Coolant Temperature (\u2109)",
            scaleType: "band",
            data: [
              "100-120",
              "121-140",
              "141-160",
              "161-180",
              "181-200",
              "201-220",
              "221-240",
              "211-260",
              "261-280",
              "281-300",
            ],
          },
        ]}
        series={[
          {
            data: [
              getBucketSize(100, 120, coolantTemperatureDataPoints),
              getBucketSize(121, 140, coolantTemperatureDataPoints),
              getBucketSize(141, 160, coolantTemperatureDataPoints),
              getBucketSize(161, 180, coolantTemperatureDataPoints),
              getBucketSize(181, 200, coolantTemperatureDataPoints),
              getBucketSize(201, 220, coolantTemperatureDataPoints),
              getBucketSize(221, 240, coolantTemperatureDataPoints),
              getBucketSize(241, 260, coolantTemperatureDataPoints),
              getBucketSize(261, 280, coolantTemperatureDataPoints),
              getBucketSize(281, 300, coolantTemperatureDataPoints),
            ],
          },
        ]}
        height={400}
      />

      <BarChart
        xAxis={[
          {
            label: "Intake Air Temperature (\u2109)",
            scaleType: "band",
            data: [
              "41-60",
              "61-80",
              "81-100",
              "101-120",
              "121-140",
              "141-160",
              "161-180",
              "181-200",
              "201-220",
              "221-240",
              "241-260",
            ],
          },
        ]}
        series={[
          {
            data: [
              getBucketSize(41, 60, intakeTemperatureDataPoints),
              getBucketSize(61, 80, intakeTemperatureDataPoints),
              getBucketSize(81, 100, intakeTemperatureDataPoints),
              getBucketSize(101, 120, intakeTemperatureDataPoints),
              getBucketSize(121, 140, intakeTemperatureDataPoints),
              getBucketSize(141, 160, intakeTemperatureDataPoints),
              getBucketSize(161, 180, intakeTemperatureDataPoints),
              getBucketSize(181, 200, intakeTemperatureDataPoints),
              getBucketSize(201, 220, intakeTemperatureDataPoints),
              getBucketSize(221, 240, intakeTemperatureDataPoints),
              getBucketSize(241, 260, intakeTemperatureDataPoints),
            ],
          },
        ]}
        height={400}
      />
    </>
  );
}
