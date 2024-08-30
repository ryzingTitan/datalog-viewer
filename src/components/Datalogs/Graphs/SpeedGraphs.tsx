import { ReactElement } from "react";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { format, parseISO } from "date-fns";
import { BarChart, LineChart } from "@mui/x-charts";

export default function SpeedGraphs(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const speedDataPoints = Array<number>();

  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    speedDataPoints.push(datalog.speed);
  });

  const getBucketSize = (low: number, high: number): number => {
    let count = 0;

    speedDataPoints.forEach((speedDataPoint) => {
      if (speedDataPoint >= low && speedDataPoint <= high) {
        count += 1;
      }
    });

    return count;
  };

  return (
    <>
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
            label: "Speed (MPH)",
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

      <BarChart
        xAxis={[
          {
            label: "Speed (MPH)",
            scaleType: "band",
            data: [
              "1-10",
              "11-20",
              "21-30",
              "31-40",
              "41-50",
              "51-60",
              "61-70",
              "71-80",
              "81-90",
              "91-100",
              "101-110",
              "111-120",
              "121-130",
              "131-140",
              "141-150",
            ],
          },
        ]}
        series={[
          {
            data: [
              getBucketSize(1, 10),
              getBucketSize(11, 20),
              getBucketSize(21, 30),
              getBucketSize(31, 40),
              getBucketSize(41, 50),
              getBucketSize(51, 60),
              getBucketSize(61, 70),
              getBucketSize(71, 80),
              getBucketSize(81, 90),
              getBucketSize(91, 100),
              getBucketSize(101, 110),
              getBucketSize(111, 120),
              getBucketSize(121, 130),
              getBucketSize(131, 140),
              getBucketSize(141, 150),
            ],
          },
        ]}
        height={400}
      />
    </>
  );
}
