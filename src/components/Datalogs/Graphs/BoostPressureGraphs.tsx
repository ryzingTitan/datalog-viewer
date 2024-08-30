import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { BarChart, LineChart } from "@mui/x-charts";

export default function BoostPressureGraphs(
  datalogTabProps: DatalogTabProps,
): ReactElement {
  const labels = Array<Date>();
  const boostPressureDataPoints = Array<number>();

  datalogTabProps.datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    boostPressureDataPoints.push(datalog.boostPressure);
  });

  const getBucketSize = (low: number, high: number): number => {
    let count = 0;

    boostPressureDataPoints.forEach((boostPressureDataPoint) => {
      if (boostPressureDataPoint > low && boostPressureDataPoint <= high) {
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
            valueFormatter: (value: string) => `${value} PSI`,
          },
        ]}
        series={[
          {
            data: boostPressureDataPoints,
            label: "Boost Pressure (PSI)",
            valueFormatter: (value) => `${value} PSI`,
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
            label: "Boost Pressure (PSI)",
            scaleType: "band",
            data: ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30", "30-35"],
          },
        ]}
        series={[
          {
            data: [
              getBucketSize(0, 5),
              getBucketSize(5, 10),
              getBucketSize(10, 15),
              getBucketSize(15, 20),
              getBucketSize(20, 25),
              getBucketSize(25, 30),
              getBucketSize(30, 35),
            ],
          },
        ]}
        height={400}
      />
    </>
  );
}
