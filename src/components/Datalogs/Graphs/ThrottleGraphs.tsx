import { ReactElement } from "react";
import DatalogTabProps from "@/interfaces/DatalogTabProps";
import { format, parseISO } from "date-fns";
import { BarChart, LineChart } from "@mui/x-charts";

export default function ThrottleGraphs(
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

  const getEngineRpmBucketSize = (low: number, high: number): number => {
    let count = 0;

    engineRpmDataPoints.forEach((engineRpmDataPoint) => {
      if (engineRpmDataPoint >= low && engineRpmDataPoint <= high) {
        count += 1;
      }
    });

    return count;
  };

  const getThrottlePositionBucketSize = (low: number, high: number): number => {
    let count = 0;

    throttlePositionDataPoints.forEach((throttlePositionDataPoint) => {
      if (
        throttlePositionDataPoint > low &&
        throttlePositionDataPoint <= high
      ) {
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
            label: "Throttle Position (%)",
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

      <BarChart
        xAxis={[
          {
            label: "Engine RPM",
            scaleType: "band",
            data: [
              "1-500",
              "501-1000",
              "1001-1500",
              "1501-2000",
              "2001-2500",
              "2501-3000",
              "3000-3500",
              "3501-4000",
              "4001-4500",
              "4501-5000",
              "5001-5500",
              "5501-6000",
              "6001-6500",
              "6501-7000",
              "7001-7500",
            ],
          },
        ]}
        series={[
          {
            data: [
              getEngineRpmBucketSize(1, 500),
              getEngineRpmBucketSize(1001, 1500),
              getEngineRpmBucketSize(1501, 2000),
              getEngineRpmBucketSize(2001, 2500),
              getEngineRpmBucketSize(2501, 3000),
              getEngineRpmBucketSize(3001, 3500),
              getEngineRpmBucketSize(3501, 4000),
              getEngineRpmBucketSize(4000, 4500),
              getEngineRpmBucketSize(4501, 5000),
              getEngineRpmBucketSize(5001, 5500),
              getEngineRpmBucketSize(5501, 6000),
              getEngineRpmBucketSize(6001, 6500),
              getEngineRpmBucketSize(6501, 7000),
              getEngineRpmBucketSize(7001, 7500),
            ],
          },
        ]}
        height={400}
      />

      <BarChart
        xAxis={[
          {
            label: "Throttle Position (%)",
            scaleType: "band",
            data: [
              "0-10",
              "10-20",
              "20-30",
              "30-40",
              "40-50",
              "50-60",
              "60-70",
              "70-80",
              "80-90",
              "90-100",
            ],
          },
        ]}
        series={[
          {
            data: [
              getThrottlePositionBucketSize(0, 10),
              getThrottlePositionBucketSize(10, 20),
              getThrottlePositionBucketSize(20, 30),
              getThrottlePositionBucketSize(30, 40),
              getThrottlePositionBucketSize(40, 50),
              getThrottlePositionBucketSize(50, 60),
              getThrottlePositionBucketSize(60, 70),
              getThrottlePositionBucketSize(70, 80),
              getThrottlePositionBucketSize(80, 90),
              getThrottlePositionBucketSize(90, 100),
            ],
          },
        ]}
        height={400}
      />
    </>
  );
}
